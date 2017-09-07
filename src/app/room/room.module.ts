import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModule } from '../main/main.module';
import { RoomMainComponent } from './components/main/main.component';
import { RoomInfoComponent } from './components/room/room.component';
import { RoomRoutingModule } from './room-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [RoomMainComponent, RoomInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    RoomRoutingModule,
    MainModule.forRoot()
  ],
  exports: [
    RoomMainComponent
  ],
})
export class RoomModule {}
