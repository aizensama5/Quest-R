import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {RoomMainComponent} from './components/main/main.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RoomMainComponent
      }
    ])
  ],
  exports: [RouterModule]
})

export class RoomRoutingModule {}

