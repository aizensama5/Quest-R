import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleResolverService } from "./service/locale-resolver.service";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', resolve: {locale: LocaleResolverService}, children: [
        {path: 'cabinet', loadChildren: 'app/cabinet/cabinet.module#CabinetModule' },
        {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
        {path: 'room', loadChildren: 'app/room/room.module#RoomModule' },
        {path: '', loadChildren: 'app/main/main.module#MainModule' }
      ]},
      {path: 'en', resolve: {locale: LocaleResolverService}, children: [
        {path: 'cabinet', loadChildren: 'app/cabinet/cabinet.module#CabinetModule' },
        {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
        {path: 'room', loadChildren: 'app/room/room.module#RoomModule' },
        {path: '', loadChildren: 'app/main/main.module#MainModule' }
      ]},
      {path: 'pl', resolve: {locale: LocaleResolverService}, children: [
        {path: 'cabinet', loadChildren: 'app/cabinet/cabinet.module#CabinetModule' },
        {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
        {path: 'room', loadChildren: 'app/room/room.module#RoomModule' },
        {path: '', loadChildren: 'app/main/main.module#MainModule' }
      ]},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
