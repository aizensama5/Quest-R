import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './popup/login-popup/login.component';
import { NgModule } from '@angular/core';
import { PopupNotificationService } from '../service/popup.notification.service';
import { AuthenticationService } from '../service/http/authentication.service';

@NgModule ({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    PopupNotificationService,
    AuthenticationService
  ]
})

export class SharedModule {}
