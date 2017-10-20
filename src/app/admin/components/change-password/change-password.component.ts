import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/http/user.service";
import {UserModel} from "../../../models/user.model";
import {CompanyService} from "../../../service/http/company.service";
import {CompanySecurityService} from "../../../service/http/company-security.service";
import {CompanySecurityModel} from "../../../models/company-security.model";
import {AuthenticationService} from "../../../service/http/authentication.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  static readonly MINIMUM_LENGTH_PASSWORD = 6;
  currentCompany: CompanySecurityModel = new CompanySecurityModel();
  currentPassword: string;
  newPassword: string;
  confirmedNewPassword: string;
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  constructor(
    private companySecurityService: CompanySecurityService,
    private authService: AuthenticationService
  ) {
    this.newPassword = '';
    this.confirmedNewPassword = '';
    this.currentCompany = JSON.parse(localStorage.getItem('admin'));
  }

  ngOnInit() {
  }

  validatePassword(currentPassword: string): boolean {
    if (this.authService.getPassword(this.currentCompany.password) === currentPassword) {
      if (this.newPassword.length < ChangePasswordComponent.MINIMUM_LENGTH_PASSWORD) {
        if (this.newPassword === this.confirmedNewPassword) {
          return true;
        } else {
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = 'Wrong repeated password';
          this.areErrors = true;
          return false;
        }
      } else {
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Minimum password length is ' + ChangePasswordComponent.MINIMUM_LENGTH_PASSWORD + ' symbols';
        this.areErrors = true;
        return false;
      }
    } else {
      this.isShowLoader = false;
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Wrong current password';
      this.areErrors = true;
      return false;
    }
  }

  save(currentPassword: string) {
    this.isShowLoader = true;
    this.areErrors = false;
    if (this.validatePassword(this.currentPassword)) {
      this.currentCompany.password = this.authService.setPassword(this.currentCompany.login, this.currentCompany.password);
      this.companySecurityService.changePassword(this.currentCompany)
        .then(() => {
          this.isShowNotificationPopup = true;
          this.isShowLoader = false;
          this.notificationPopupMessage = 'Saved';
          return true;
        })
        .catch(() => {
          this.isShowNotificationPopup = true;
          this.isShowLoader = false;
          this.notificationPopupMessage = 'Something was wrong';
          return false;
        })
    }
  }

  closePopup() {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
    this.areErrors = false;
  }
}
