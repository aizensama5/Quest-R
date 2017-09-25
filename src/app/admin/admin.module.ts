import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminMainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AdminMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
  ],
})
export class AdminModule {}
