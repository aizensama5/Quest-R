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


@NgModule({
  declarations: [
    AdminMainComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AsideMenuComponent,
    HomeComponent,
    CompanyDataComponent,
    AdminRoomsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ],
  exports: [
  ],
  providers: [
    CompanyService,
    CompanySecurityService
  ]
})
export class AdminModule {}
