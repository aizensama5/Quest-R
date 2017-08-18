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
import {ProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {UserService} from '../service/http/user.service';
import {HttpClient} from '../service/http.client';
import { HistoryComponent } from './components/profile/history/history.component';
import { GalleryComponent } from './components/profile/gallery/gallery.component';
import { FavoritesComponent } from './components/profile/favorites/favorites.component';
import { FriendsComponent } from './components/profile/friends/friends.component';
import { ReviewsComponent } from './components/profile/reviews/reviews.component';
import {HistoryService} from '../service/profile/history.service';

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
    ProfileComponent,
    ProfileMenuComponent,
    HistoryComponent,
    GalleryComponent,
    FavoritesComponent,
    FriendsComponent,
    ReviewsComponent
  ],
  exports: [],
  providers: [
    UserService,
    HttpClient,
    HistoryService
  ]
})
export class CabinetModule {
}
