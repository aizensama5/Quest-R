import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from '../layout/layout.module';
import {MainRoutingModule} from '../main/main-routing.module';
import {SwiperModule} from 'angular2-useful-swiper';
import {AgmCoreModule} from '@agm/core';


import {RoomComponent} from './components/room/room.component';
import {FilterRoomsComponent} from '../main/components/select-room/filter-rooms/filter-rooms.component';
import {SelectRoomComponent} from '../main/components/select-room/select-room.component';
import {ReservedRoomComponent} from '../main/components/reserved-room/reserved-room.component';
import {ReservedCalendarComponent} from '../main/components/reserved-room/reserved-calendar/reserved-calendar.component';
import {ReservedFormComponent} from '../main/components/reserved-room/reserved-form/reserved-form.component';
import {OrgRuleComponent} from '../main/components/org-rule/org-rule.component';
import {BookingRoomComponent} from '../main/components/booking-room/booking-room.component';
import {SharesComponent} from '../main/components/shares/shares.component';
import {ReviewsComponent} from '../main/components/reviews/reviews.component';
import {ReviewComponent} from '../main/components/reviews/review/review.component';
import {MapComponent} from '../main/components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutModule,

    MainRoutingModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBviSA3Z0xaZegK_tWyxwPMdc15lVVwWFk'
    }),
  ],
  declarations: [
    RoomComponent,
    FilterRoomsComponent,
    SelectRoomComponent,
    ReservedRoomComponent,
    ReservedCalendarComponent,
    ReservedFormComponent,
    OrgRuleComponent,
    BookingRoomComponent,
    SharesComponent,
    ReviewsComponent,
    ReviewComponent,
    MapComponent,
  ],
  exports: []
})
export class RoomModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RoomModule,
      providers: []
    };
  }
}
