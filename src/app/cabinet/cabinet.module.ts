import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { SwiperModule } from 'angular2-useful-swiper';
import { AgmCoreModule } from '@agm/core';

// components
import { MainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutModule,

    CabinetRoutingModule,
    SwiperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBviSA3Z0xaZegK_tWyxwPMdc15lVVwWFk'
    }),
  ],
  declarations: [
    MainComponent,
  ],
  exports: []
})
export class CabinetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CabinetModule,
      providers: []
    };
  }
}
