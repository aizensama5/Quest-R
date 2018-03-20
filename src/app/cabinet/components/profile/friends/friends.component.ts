import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {AuthenticationService} from "../../../../service/http/authentication.service";
import {LoaderService} from "../../../../service/loader.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  user$: Observable<firebase.User>;
  user: any;
  authStatus: any;
  userFriends: any[] = [];
  isShowLoader: boolean;

  constructor(
    authService: AuthenticationService
  ) {
    this.isShowLoader = true;
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: firebase.User) => {
      this.user = user;
    });
    authService.authStatus()
      .then((authStatus) => {
        this.authStatus = JSON.parse(authStatus);
        if (this.authStatus.providerId === 'facebook.com') {
          authService.getFacebookFriends(this.authStatus)
            .then((friendsData: any) => {
              if (friendsData.status === 200) {
                this.userFriends = JSON.parse(friendsData['_body']);
              }
              this.isShowLoader = false;
            })
            .catch(() => this.isShowLoader = false);
        }
        this.isShowLoader = false;
      })
      .catch(() => this.isShowLoader = false);
  }

}
