import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminMainComponent } from './components/main/main.component';
import { AdminLoginComponent } from './components/login/login.component';
import { CompanyDataComponent } from './components/company-data/company-data.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRoomsComponent } from './components/admin-rooms/admin-rooms.component';
import { AdminGuard } from '../guard/admin.guard';


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
        { path: 'rooms', component: AdminRoomsComponent }
      ]},
    ])
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule {}

