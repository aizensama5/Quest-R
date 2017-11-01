import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {PopupNotificationService} from '../popup.notification.service';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../models/user.model';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {CompanySecurityModel} from '../../models/company-security.model';
import {CompanySecurityService} from './company-security.service';
import {environment} from '../../../environments/environment.prod';
import {LoginModel} from "../../admin/components/login/login.model";

@Injectable()
export class AuthenticationService {
  public static readonly adminLocalStorageName = 'admin';
  allUsers: UserModel[] = [];
  locale: string = '';
  loginStatus: LoginModel;

  constructor(private af: AngularFireAuth,
              private userService: UserService,
              public router: Router,
              private companySecurityService: CompanySecurityService,) {
    userService.all().subscribe((users: UserModel[]) => {
      this.allUsers = users;
    });
    this.locale = this.router.url.split('/')[1] === 'en' || this.router.url.split('/')[1] === 'pl' ? this.router.url.split('/')[1] : '';
  }


  googleLogin(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(() => {
      window.location.href = this.locale + '/cabinet/';
    }, (error) => {
      console.log(error);
    });
  }

  facebookLogin(): void {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then((authInfo: any) => {
      window.location.href = this.locale + '/cabinet/';
    }, (error) => {

    });
  }

  twitterLogin(): void {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(() => {
      window.location.href = this.locale + '/cabinet/';
    }, (error) => {
      console.log(error);
    });
  }

  currentUser(): Observable<firebase.User> {
    return this.af.authState;
  }

  logout(): void {
    this.af.auth.signOut().then(() => {
      this.router.navigate(['/' + this.locale]);
    });
  }

  adminLogin(email: string, password: string): Promise<LoginModel> {
    this.loginStatus = new LoginModel();
    let companySecurityData: CompanySecurityModel;
    return new Promise((resolve, reject) => {
      this.companySecurityService.all().subscribe((companiesSecData: CompanySecurityModel[]) => {
        if (companiesSecData.length) {
          const pass = this.setPassword(email, password);
          companySecurityData = companiesSecData.filter((companySecData: CompanySecurityModel) => companySecData.login === email && companySecData.password === pass)[0];
          if (companySecurityData) {
            localStorage.setItem(AuthenticationService.adminLocalStorageName, JSON.stringify(companySecurityData));
            this.loginStatus = {
              status: true,
              message: ''
            };
            resolve(this.loginStatus);
          } else {
            this.loginStatus = {
              status: false,
              message: 'Wrong email or password'
            };
            resolve(this.loginStatus);
          }
        } else {
          this.loginStatus = {
            status: false,
            message: 'There are no registered admins'
          };
          resolve(this.loginStatus);
        }
      }, () => {
        this.loginStatus = {
          status: false,
          message: 'Error'
        };
        resolve(this.loginStatus);
      });
    });
  }

  adminLogout(): void {
    localStorage.removeItem(AuthenticationService.adminLocalStorageName);
    this.router.navigate(['/admin/login/']);
  }

  setPassword(email: string, password: string): string {
    return (btoa(email + environment.salt + password));
  }

  getPassword(password: string): string {
    return atob(password) ? atob(password).split(environment.salt)[1] : '';
  }

  addNewUser(): void {
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
