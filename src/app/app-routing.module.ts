import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'cabinet', loadChildren: 'app/cabinet/cabinet.module#CabinetModule' },
      {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
      {path: 'room', loadChildren: 'app/room/room.module#RoomModule' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
