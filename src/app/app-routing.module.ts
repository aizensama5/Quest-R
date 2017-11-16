import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocaleResolverService } from "./service/locale-resolver.service";
import {NotFoundComponent} from "./not-found/not-found.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', resolve: {locale: LocaleResolverService}, children: [
        {path: 'cabinet', loadChildren: 'app/cabinet/cabinet.module#CabinetModule' },
        {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
        {path: 'room', loadChildren: 'app/room/room.module#RoomModule' },
        {path: '', loadChildren: 'app/main/main.module#MainModule' },
        {path: '**', component: NotFoundComponent }
      ]},
      {path: 'en', resolve: {locale: LocaleResolverService}, children: [
        {path: 'cabinet', loadChildren: 'app/cabinet/cabinet.module#CabinetModule' },
        {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
        {path: 'room', loadChildren: 'app/room/room.module#RoomModule' },
        {path: '', loadChildren: 'app/main/main.module#MainModule' },
        {path: '**', component: NotFoundComponent }
      ]},
      {path: 'pl', resolve: {locale: LocaleResolverService}, children: [
        {path: 'cabinet', loadChildren: 'app/cabinet/cabinet.module#CabinetModule' },
        {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
        {path: 'room', loadChildren: 'app/room/room.module#RoomModule' },
        {path: '', loadChildren: 'app/main/main.module#MainModule' },
        {path: '**', component: NotFoundComponent }
      ]},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
