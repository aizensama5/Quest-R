import { NgModule } from '@angular/core';
import { IsActivePipe } from './is-active.pipe';
import {PopupColorPipe} from './popup-color.pipe';
import { UserNamePipe } from './user-name.pipe';

@NgModule({
  declarations: [
    IsActivePipe,
    PopupColorPipe,
    UserNamePipe
  ],
  exports: [
    IsActivePipe,
    PopupColorPipe
  ]
})
export class PipeModule { }
