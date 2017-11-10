import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminMainComponent } from './components/main/main.component';
import { AdminLoginComponent } from './components/login/login.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRoomsComponent } from './components/admin-rooms/admin-rooms.component';
import { AdminGuard } from '../guard/admin.guard';
import { AdminRoomsEditComponent } from './components/admin-rooms/admin-rooms-edit/admin-rooms-edit.component';
import { EditRoomsResolverService } from '../service/edit-rooms-resolver.service';
import { AdminReviewsComponent } from './components/admin-reviews/admin-reviews.component';
import { AdminBookingsComponent } from './components/admin-bookings/admin-bookings.component';
import { DaysSettingsComponent } from './components/days-settings/days-settings.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PricesAndSettingsComponent } from './components/prices-and-settings/prices-and-settings.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ContactComponent } from "./components/contact/contact.component";
import { TermsOfServiceComponent } from "./components/terms-of-service/terms-of-service.component";
import { AdminBookingsEditComponent } from "./components/admin-bookings/admin-bookings-edit/admin-bookings-edit.component";
import { EditBookingResolverService } from "../service/edit-booking-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: '/admin/dashboard/home', pathMatch: 'full', canActivate: [AdminGuard] },
      { path: 'login', component: AdminLoginComponent },
      { path: 'dashboard', redirectTo: 'dashboard/home', pathMatch: 'full', canActivate: [AdminGuard] },
      {
        path: 'dashboard',
        canActivate: [AdminGuard],
        component: AdminMainComponent, children: [
        { path: 'company-data', component: CompanyDataComponent },
        { path: 'home', component: HomeComponent },
        { path: 'rooms', component: AdminRoomsComponent },
        { path: 'rooms/:id/edit', component: AdminRoomsEditComponent, resolve: {room: EditRoomsResolverService} },
        { path: 'reviews', component: AdminReviewsComponent },
        { path: 'bookings', component: AdminBookingsComponent },
        { path: 'bookings/:id/edit', component: AdminBookingsEditComponent, resolve: {order: EditBookingResolverService} },
        { path: 'calendar', component: CalendarComponent },
        { path: 'prices-and-settings', component: PricesAndSettingsComponent },
        { path: 'special-offers', component: SpecialOffersComponent },
        { path: 'configuration', component: ConfigurationComponent },
        { path: 'change-password', component: ChangePasswordComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'terms-of-service', component: TermsOfServiceComponent },
        { path: 'days-settings/:id', component: DaysSettingsComponent, resolve: {room: EditRoomsResolverService}  },
      ]},
    ])
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule {}

