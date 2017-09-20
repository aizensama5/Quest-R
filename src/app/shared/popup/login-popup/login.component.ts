import {Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../../service/http/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent {
  @Input() isShowLoginPopup: boolean;
  @Output() onClosePopup: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authService: AuthenticationService
  ) {}

  closeLoginPopup() {
    this.onClosePopup.emit(false);
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  facebookLogin() {
    this.authService.facebookLogin();
  }

  twitterLogin() {
    this.authService.twitterLogin();
  }
}
