import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {error} from 'util';

@Injectable()
export class AuthenticationService {

  constructor(
    private af: AngularFireAuth
  ) { }


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
    firebase.auth().signInWithPopup(provider).then(() => {
      window.location.href = '/cabinet/';
    }, (error) => {
      console.log(error);
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

  currentUser () {
    return this.af.authState;
  }

  logout() {
    this.af.auth.signOut();
  }
}
