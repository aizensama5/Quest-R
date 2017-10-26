import { NgModule } from '@angular/core';
import { IsActivePipe } from './is-active.pipe';
import {PopupColorPipe} from './popup-color.pipe';
import { UserNamePipe } from './user-name.pipe';
import { RoomNamePipe } from './room-name.pipe';
import { TranslateDPipe } from './translate-d.pipe';
import { LanguagePipe } from './language.pipe';
import { TranslateSPipe } from './translate-s.pipe';
import { HttpService } from "../service/http/http.service";

@NgModule({
  declarations: [
    TranslateSPipe,
    IsActivePipe,
    PopupColorPipe,
    UserNamePipe,
    RoomNamePipe,
    TranslateDPipe,
    LanguagePipe
  ],
  exports: [
    TranslateSPipe,
    IsActivePipe,
    PopupColorPipe,
    UserNamePipe,
    RoomNamePipe,
    TranslateDPipe,
    LanguagePipe
  ],
  providers: [
    HttpService
  ]
})
export class PipeModule { }
