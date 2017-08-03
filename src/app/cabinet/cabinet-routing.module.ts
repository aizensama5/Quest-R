import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CabinetMainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: ':id', component: CabinetMainComponent}
    ])
  ],
  exports: [RouterModule]
})
export class CabinetRoutingModule {
}
