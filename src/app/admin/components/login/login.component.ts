import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/http/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#d2d6de';
    document.body.style.backgroundImage = 'none';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundImage = 'linear-gradient(214deg, #000000, #2a2c2e 54%, #131313);';
  }

  adminFacebookLogin() {
    console.log('facebook');
  }

  adminLogin(email, password) {
    this.authService.adminLogin(email, password);
  }

}
