import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { PopupNotificationService } from '../popup.notification.service';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../models/user.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { CompanySecurityModel } from '../../models/company-security.model';
import { CompanySecurityService } from './company-security.service';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class AuthenticationService {
  private static readonly adminLocalStorageName = 'admin';
  allUsers: UserModel[] = [];

  constructor(
    private af: AngularFireAuth,
    public popupNotificationService: PopupNotificationService,
    private userService: UserService,
    public router: Router,
    private companySecurityService: CompanySecurityService,
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
    let companySecurityData: CompanySecurityModel;
    this.companySecurityService.all().subscribe((companiesSecData: CompanySecurityModel[]) => {
      if (companiesSecData.length) {
        const pass = this.setPassword(email, password);
        companySecurityData = companiesSecData.filter((companySecData: CompanySecurityModel) => companySecData.login === email && companySecData.password === pass)[0];
        if (companySecurityData) {
          localStorage.setItem(AuthenticationService.adminLocalStorageName, JSON.stringify(companySecurityData));
          this.router.navigate(['/admin/dashboard/']);
        }
      } else {
        console.log('нету зарегистрированых админов :(');
      }
    }, (error) => {
      console.log(error);
    });
  }

  adminLogout () {
    localStorage.removeItem(AuthenticationService.adminLocalStorageName);
    this.router.navigate(['/admin/login/']);
  }

  setPassword(email: string, password: string): string {
    return (btoa(email) + btoa(environment.salt) + btoa(password));
  }

  getPassword(password: string) {
    return atob(password).split(environment.salt)[1];
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
