import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModule } from '../main/main.module';
import { RoomMainComponent } from './components/main/main.component';
import { RoomInfoComponent } from './components/room/room.component';
import { RoomRoutingModule } from './room-routing.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [RoomMainComponent, RoomInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    RoomRoutingModule,
    MainModule,
  ],
  exports: [
    RoomMainComponent
  ],
})
export class RoomModule {}
