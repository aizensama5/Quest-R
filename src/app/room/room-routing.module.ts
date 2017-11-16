import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoomMainComponent } from './components/main/main.component';
import { RoomResolverService } from "../service/room-resolver.service";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ':id', component: RoomMainComponent, resolve: {'room': RoomResolverService}
      }
    ])
  ],
  exports: [RouterModule]
})

export class RoomRoutingModule {}

