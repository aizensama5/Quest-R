import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './popup/login-popup/login.component';
import { NgModule } from '@angular/core';
import { PopupNotificationService } from '../service/popup.notification.service';
import { AuthenticationService } from '../service/http/authentication.service';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { TabsModule } from "ngx-tabs";
import { LanguageTabsetComponent } from "./tabset/tabset.component";
import { PipeModule } from "../pipe/pipe.module";
import { TabsetInputComponent } from './tabset-input/tabset-input.component';


@NgModule ({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TabsModule,
    PipeModule
  ],
  declarations: [
    LoginComponent,
    UploadImageComponent,
    LanguageTabsetComponent,
    TabsetInputComponent
  ],
  exports: [
    LoginComponent,
    FormsModule,
    UploadImageComponent,
    LanguageTabsetComponent
  ],
  providers: [
    PopupNotificationService,
    AuthenticationService
  ]
})

export class SharedModule {}
