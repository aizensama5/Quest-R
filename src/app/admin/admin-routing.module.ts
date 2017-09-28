import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminMainComponent } from './components/main/main.component';
import { AdminLoginComponent } from './components/login/login.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: AdminLoginComponent,
        canActivate: [],
      },
      {
        path: 'dashboard',
        component: AdminMainComponent,
      },
    ])
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule {}

