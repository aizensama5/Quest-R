import { NgModule } from '@angular/core';
import { IsActivePipe } from './is-active.pipe';
import {PopupColorPipe} from './popup-color.pipe';
import { UserNamePipe } from './user-name.pipe';
import { RoomNamePipe } from './room-name.pipe';

@NgModule({
  declarations: [
    IsActivePipe,
    PopupColorPipe,
    UserNamePipe,
    RoomNamePipe
  ],
  exports: [
    IsActivePipe,
    PopupColorPipe,
    UserNamePipe,
    RoomNamePipe
  ]
})
export class PipeModule { }
