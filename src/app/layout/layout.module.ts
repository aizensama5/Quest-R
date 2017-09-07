import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { FooterComponent } from './components/footer/footer.component';
import { SelectListRoomsComponent } from './components/select-list-rooms/select-list-rooms.component';
import { SelectDropdownComponent } from './components/select-dropdown/select-dropdown.component';
import { RoundSliderComponent } from './components/round-slider/round-slider.component';
import { RoundSliderGenderComponent } from './components/round-slider-genre/round-slider-gender.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        ToolbarComponent,
        SelectLanguageComponent,
        FooterComponent,
        SelectListRoomsComponent,
        SelectDropdownComponent,
        RoundSliderComponent,
        RoundSliderGenderComponent
    ],
    exports: [
        ToolbarComponent,
        SelectLanguageComponent,
        FooterComponent,
        SelectListRoomsComponent,
        SelectDropdownComponent,
        RoundSliderComponent,
        RoundSliderGenderComponent
    ]
})
export class LayoutModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LayoutModule,
            providers: []
        };
    }
}
