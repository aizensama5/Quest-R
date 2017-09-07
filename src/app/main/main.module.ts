import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { MainRoutingModule } from './main-routing.module';
import { SwiperModule } from 'angular2-useful-swiper';
import { AgmCoreModule } from '@agm/core';
import { SelectModule } from 'angular2-select';

// services
import { ReservationService } from '../service/http/reservation.service';

// components
import { MainComponent } from './components/main/main.component';
import { SwiperRoomComponent } from './components/swiper-room/swiper-room.component';
import { RoomComponent } from './components/select-room/list-rooms/room/room.component';
import { ListRoomsComponent } from './components/select-room/list-rooms/list-rooms.component';
import { FilterRoomsComponent } from './components/select-room/filter-rooms/filter-rooms.component';
import { SelectRoomComponent } from './components/select-room/select-room.component';
import { ReservedRoomComponent } from './components/reserved-room/reserved-room.component';
import { ReservedCalendarComponent } from './components/reserved-room/reserved-calendar/reserved-calendar.component';
import { ReservedFormComponent } from './components/reserved-room/reserved-form/reserved-form.component';
import { OrgRuleComponent } from './components/org-rule/org-rule.component';
import { BookingRoomComponent } from './components/booking-room/booking-room.component';
import { SharesComponent } from './components/shares/shares.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewComponent } from './components/reviews/review/review.component';
import { MapComponent } from './components/map/map.component';
import { FilterCircleComponent } from './components/select-room/filter-rooms/filter-circle/filter-circle.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        LayoutModule,
        SelectModule,
        MainRoutingModule,
        SwiperModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBviSA3Z0xaZegK_tWyxwPMdc15lVVwWFk'
        }),
    ],
    declarations: [
        MainComponent,
        SwiperRoomComponent,
        RoomComponent,
        ListRoomsComponent,
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
        FilterCircleComponent
    ],
    exports: [
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
      MapComponent
    ],
    providers: [
      ReservationService
    ]
})
export class MainModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MainModule,
            providers: []
        };
    }
}
