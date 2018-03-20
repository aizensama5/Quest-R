import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../pipe/pipe.module';
import { SelectModule } from 'angular2-select';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { FooterComponent } from './components/footer/footer.component';
import { SelectListRoomsComponent } from './components/select-list-rooms/select-list-rooms.component';
import { RoundSliderComponent } from './components/round-slider/round-slider.component';
import { RoundSliderGenderComponent } from './components/round-slider-genre/round-slider-gender.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipeModule,
        FormsModule,
        SharedModule,
        SelectModule
    ],
    declarations: [
        ToolbarComponent,
        SelectLanguageComponent,
        FooterComponent,
        SelectListRoomsComponent,
        RoundSliderComponent,
        RoundSliderGenderComponent
    ],
    exports: [
        ToolbarComponent,
        SelectLanguageComponent,
        FooterComponent,
        SelectListRoomsComponent,
        RoundSliderComponent,
        RoundSliderGenderComponent
    ],
    providers: []
})
export class LayoutModule {}
