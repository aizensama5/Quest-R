import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../layout/layout.module';
import {CabinetRoutingModule} from './cabinet-routing.module';
import {SwiperModule} from 'angular2-useful-swiper';
import {AgmCoreModule} from '@agm/core';

// components
import {CabinetMainComponent} from './components/main/main.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UserService} from '../service/http/user.service';
import {HttpClient} from '../service/http.client';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutModule,

    CabinetRoutingModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBviSA3Z0xaZegK_tWyxwPMdc15lVVwWFk'
    }),
  ],
  declarations: [
    CabinetMainComponent,
    ProfileComponent
  ],
  exports: [],
  providers: [
    UserService,
    HttpClient
  ]
})
export class CabinetModule {
}
