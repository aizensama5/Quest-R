import { NgModule } from '@angular/core';
import { IsActivePipe } from './is-active.pipe';
import {PopupColorPipe} from './popup-color.pipe';

@NgModule({
  declarations: [
    IsActivePipe,
    PopupColorPipe
  ],
  exports: [
    IsActivePipe,
    PopupColorPipe
  ]
})
export class PipeModule { }
