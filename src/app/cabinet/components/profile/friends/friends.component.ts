import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {AuthenticationService} from "../../../../service/http/authentication.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  user$: Observable<firebase.User>;
  user: any;

  constructor(authService: AuthenticationService) {
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: firebase.User) => {
      this.user = user;
      console.log(this.user);
    });

  }

}
