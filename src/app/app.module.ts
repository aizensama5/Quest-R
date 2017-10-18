// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './service/service.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';
import { RoomModule } from './room/room.module';
import { CabinetModule } from './cabinet/cabinet.module';
import { StoreModule } from '@ngrx/store';
import * as reducersMain from './reducers';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';
import { AdminModule } from './admin/admin.module';
import { GuardModule } from './guard/guard.module';
import { SwiperModule } from 'angular2-useful-swiper';


// operators
import './operators';

// components
import { AppComponent } from './app/app.component';

import { TimeService } from './service/time.service';
import { GenreService } from './service/genre.service';
import { PricesTypesService } from './service/prices-types.service';
import { PipeModule } from './pipe/pipe.module';
import { WebDocumentService } from './service/http/web-document.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    AppRoutingModule,
    RoomModule,
    ServiceModule.forRoot(),
    MainModule,
    StoreModule.provideStore(reducersMain.reducer),
    CabinetModule,
    AdminModule,
    BrowserAnimationsModule,
    GuardModule,
    PipeModule,
    SwiperModule
  ],
  providers: [
    GenreService,
    TimeService,
    PricesTypesService,
    WebDocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
