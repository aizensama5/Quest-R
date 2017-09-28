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


@NgModule({
  declarations: [
    AdminMainComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AsideMenuComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ],
  exports: [
  ],
})
export class AdminModule {}
