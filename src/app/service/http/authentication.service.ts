import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { PopupNotificationService } from '../popup.notification.service';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../models/user.model';
import {UserService} from './user.service';
import { UserRoomsHistoryModel } from '../../models/user-room-history.model';
import { User } from 'firebase/app';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  allUsers: UserModel[] = [];

  constructor(
    private af: AngularFireAuth,
    public popupNotificationService: PopupNotificationService,
    private userService: UserService,
    public router: Router
  ) {
    userService.all().subscribe((users: UserModel[]) => {
      this.allUsers = users;
    });
  }


  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(() => {
      window.location.href = '/cabinet/';
    }, (error) => {
      console.log(error);
    });
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then((authInfo: any) => {
      console.log(authInfo);
      window.location.href = '/cabinet/';
    }, (error) => {

    });
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(() => {
      window.location.href = '/cabinet/';
    }, (error) => {
      console.log(error);
    });
  }

  currentUser (): Observable<firebase.User> {
    return this.af.authState;
  }

  logout() {
    this.af.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  adminLogin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        this.router.navigate(['/admin/dashboard']);
      }, (error) => {
        console.log(error);
    });
  }

  addNewUser() {
    let existingUser = false;
    let newUser: any;
    this.currentUser().subscribe((user) => {
      if (user) {
        this.userService.all().subscribe((users: UserModel[]) => {
          if (users) {
            existingUser = this.userService.getCoincidenceId(users, user.uid);
            if (!existingUser) {
              newUser = {
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL,
                email: user.email,
              };
              this.userService.addUser(newUser).then();
            }
          }
        });
      }
    });
  }
}
