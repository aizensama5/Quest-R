import { RouterModule } from '@angular/router';
import { RoomComponent } from './components/room/room.component';


RouterModule.forChild([
  {
    path: '',
    component: RoomComponent,
    children: [
      {
        path: '',
        component: RoomComponent
      }
    ]
  }
]);


export class RoomRoutingModule { }

