// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceModule } from './service/service.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';

// operators
import './operators';

// components
import { AppComponent } from './app/app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AppRoutingModule,
    LayoutModule.forRoot(),
    ServiceModule.forRoot(),
    MainModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
