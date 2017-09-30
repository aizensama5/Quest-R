import { NgModule } from '@angular/core';
import { IsActivePipe } from './is-active.pipe';

@NgModule({
  declarations: [
    IsActivePipe
  ],
  exports: [
    IsActivePipe
  ]
})
export class PipeModule { }
