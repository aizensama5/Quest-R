// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
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
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";


// operators
import './operators';

// components
import { AppComponent } from './app/app.component';

import { PipeModule } from './pipe/pipe.module';

// services
import { TimeService } from './service/time.service';
import { PricesTypesService } from './service/prices-types.service';
import { GenreService } from './service/genre.service';
import { WebDocumentService } from './service/http/web-document.service';
import { LanguageService } from "./service/language.service";
import { DescriptionService } from "./service/description.service";
import { HttpService } from "./service/http/http.service";
import {LocaleResolverService} from "./service/locale-resolver.service";
import {UserHistoryService} from "./service/user-history.service";
import {UserFavoritesService} from "./service/user-favorites.service";
import {NotFoundModule} from "./not-found/not-found.module";
import {FacebookModule, FacebookService} from "ngx-facebook";


@NgModule({
  declarations: [
    AppComponent,
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
    FacebookModule.forRoot(),
    MainModule,
    StoreModule.provideStore(reducersMain.reducer),
    CabinetModule,
    AdminModule,
    NotFoundModule,
    BrowserAnimationsModule,
    GuardModule,
    PipeModule,
    SwiperModule
  ],
  providers: [
    GenreService,
    TimeService,
    PricesTypesService,
    WebDocumentService,
    LanguageService,
    DescriptionService,
    HttpService,
    LocaleResolverService,
    UserHistoryService,
    UserFavoritesService,
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
