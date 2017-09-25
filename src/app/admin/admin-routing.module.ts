import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminMainComponent } from './components/main/main.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: AdminMainComponent
      }
    ])
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule {}

