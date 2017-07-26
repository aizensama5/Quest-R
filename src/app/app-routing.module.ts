import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      // {path: 'brand', loadChildren: () => BrandModule, canActivateChild: [UserGuard]},
      // {path: 'influencer', loadChildren: () => InfluencerModule, canActivateChild: [UserGuard]},
      {path: '', loadChildren: 'app/main/main.module#MainModule' }
      // { path: '**', redirectTo: '' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
