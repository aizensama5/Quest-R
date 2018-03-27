import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../service/http/authentication.service';
import {LanguageService} from "../../../service/language.service";
import {Router} from "@angular/router";
import {LoginModel} from "./login.model";

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  languageList: any[] = [
    {code: 'en', name: 'English'},
    {code: 'pl', name: 'Polski'},
  ];

  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  selectedLang: any = {code: '', name: ''};

  constructor(private authService: AuthenticationService,
              public languageService: LanguageService,
              public router: Router) {
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#d2d6de';
    document.body.style.backgroundImage = 'none';
    this.getCurrentLang();
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundImage = 'linear-gradient(214deg, #000000, #2a2c2e 54%, #131313);';
  }

  getCurrentLang() {
    const locale = window.location.pathname.split('/')[1];
    switch (locale) {
      case 'en':
        this.selectedLang = this.languageList[0];
        break;
      case 'pl':
        this.selectedLang = this.languageList[1];
        break;
      default:
        this.languageService.getCurrentLocale().subscribe((curLoc: any) => {
          this.selectedLang.code = curLoc[0].$value;
          this.selectedLang.name = curLoc[0].$value === 'en' ? this.languageList[0].name : this.languageList[1].name;
        });
    }
  }

  onSelectLang(lang: any) {
    this.selectedLang = lang === 'en' ? this.languageList[0] : this.languageList[1];
    this.router.navigate(['/' + this.selectedLang.code + '/admin/login']);
  }

  adminFacebookLogin() {
    console.log('facebook');
  }

  adminLogin(email, password) {
    this.areErrors = false;
    this.isShowLoader = true;
    this.authService.adminLogin(email, password)
      .then((loginStatus: LoginModel) => {
        if (loginStatus.status) {
          this.isShowLoader = false;
          this.router.navigate(['/admin/dashboard/']);
        } else {
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = loginStatus.message;
          this.areErrors = true;
        }
      })
  }

  closePopup() {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
    this.areErrors = false;
  }

}
