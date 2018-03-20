import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../models/user.model';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {CompanySecurityModel} from '../../models/company-security.model';
import {CompanySecurityService} from './company-security.service';
import {environment} from '../../../environments/environment.prod';
import {LoginModel} from "../../admin/components/login/login.model";
import {FacebookService, InitParams} from "ngx-facebook";
import {Http} from "@angular/http";

@Injectable()
export class AuthenticationService {
  public static readonly adminLocalStorageName = 'admin';
  allUsers: UserModel[] = [];
  locale: string = '';
  loginStatus: LoginModel;
  twitterHeaders: object = {

  };

  constructor(private af: AngularFireAuth,
              private userService: UserService,
              public router: Router,
              private http: Http,
              private companySecurityService: CompanySecurityService,
              private fb: FacebookService
  ) {
    const facebookInitParams: InitParams = {
      appId: '1418986268208478',
      xfbml: true,
      version: 'v2.10'
    };
    this.fb.init(facebookInitParams);

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

  getFacebookFriends(authData): Promise<any> {
    return new Promise((resolve) => {
      const fbFriends = this.http.get("https://graph.facebook.com/v2.11/me?fields=friends&access_token="+authData.accessToken);
      fbFriends.subscribe((friends) => {
        resolve(friends);
      });
    });
  }

  getTwitterFriends(authInfo): Promise<any> {
    return new Promise((resolve) => {
      const twitterHeaders: object = {
        userName: authInfo.user.displayName
      };
      console.log(twitterHeaders['userName']);
      console.log(authInfo);
      const twFriends = this.http.get('https://api.twitter.com/1.1/friends/list.json?screen_name=' + twitterHeaders['userName'] + '&count=30');
      console.log(twFriends);
      twFriends.subscribe((friends) => {
        resolve(friends);
      });
    });
  }

  facebookLogin(redirectUrl?: string): void {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.addScope('user_friends');
    firebase.auth().signInWithPopup(provider).then((authInfo) => {
      localStorage.setItem('authStatus', JSON.stringify(authInfo.credential));
      if (!redirectUrl) {
        this.router.navigate([this.locale + '/cabinet/']);
      } else {
        this.router.navigate([this.locale + redirectUrl]);
      }
    }, (error) => {
      console.log(error);
    });
  }

  twitterLogin(): void {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then((authInfo) => {
      localStorage.setItem('authStatus', JSON.stringify(authInfo));
      // this.getTwitterFriends(authInfo).then((friends) => {
      //   console.log(friends);
      // });
      this.router.navigate([this.locale + '/cabinet/']);
    }, (error) => {
      console.log(error);
    });
  }

  currentUser(): Observable<firebase.User> {
    return this.af.authState;
  }

  authStatus(): Promise<any> {
    return new Promise((resolve) => {
      resolve(localStorage.getItem('authStatus'));
    });
  }

  logout(): void {
    this.af.auth.signOut().then(() => {
      localStorage.removeItem('authStatus');
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
