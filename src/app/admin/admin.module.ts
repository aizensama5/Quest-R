import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminMainComponent } from './components/main/main.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/login/login.component';
import { AdminHeaderComponent } from './components/header/header.component';
import { AdminFooterComponent } from './components/footer/footer.component';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { AdminRoomsComponent } from './components/admin-rooms/admin-rooms.component';
import { CompanyService } from '../service/http/company.service';
import { CompanySecurityService } from '../service/http/company-security.service';
import { FormsModule } from '@angular/forms';
import { UploadPhotoComponent } from './components/company-data/upload-photo/upload-photo.component';
import { ImageStorageService } from '../service/http/image-storage.service';
import { PipeModule } from '../pipe/pipe.module';
import { AdminRoomsEditComponent } from './components/admin-rooms/admin-rooms-edit/admin-rooms-edit.component';
import { EditRoomsResolverService } from '../service/edit-rooms-resolver.service';
import { AdminReviewsComponent } from './components/admin-reviews/admin-reviews.component';
import { DataTablesModule } from 'angular-datatables';
import { AdminBookingsComponent } from './components/admin-bookings/admin-bookings.component';
import { PricesAndSettingsComponent } from './components/prices-and-settings/prices-and-settings.component';
import { DaysSettingsComponent } from './components/days-settings/days-settings.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { PricesTypesModel } from '../models/prices-types.model';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ConfigService } from '../service/http/config.service';
import {DaysSettingsService} from '../service/days-settings.service';


@NgModule({
  declarations: [
    AdminMainComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AsideMenuComponent,
    HomeComponent,
    CompanyDataComponent,
    AdminRoomsComponent,
    UploadPhotoComponent,
    AdminRoomsEditComponent,
    AdminReviewsComponent,
    AdminBookingsComponent,
    PricesAndSettingsComponent,
    DaysSettingsComponent,
    CalendarComponent,
    SpecialOffersComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule,
    PipeModule,
    DataTablesModule
  ],
  exports: [
  ],
  providers: [
    CompanyService,
    CompanySecurityService,
    ImageStorageService,
    EditRoomsResolverService,
    PricesTypesModel,
    ConfigService,
    DaysSettingsService
  ]
})
export class AdminModule {}
