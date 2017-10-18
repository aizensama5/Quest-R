import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './popup/login-popup/login.component';
import { NgModule } from '@angular/core';
import { PopupNotificationService } from '../service/popup.notification.service';
import { AuthenticationService } from '../service/http/authentication.service';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule ({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
    UploadImageComponent
  ],
  exports: [
    LoginComponent,
    FormsModule,
    UploadImageComponent
  ],
  providers: [
    PopupNotificationService,
    AuthenticationService
  ]
})

export class SharedModule {}
