import { NgModule, ModuleWithProviders } from '@angular/core';
import { RoomService } from './http/room.service';
import { SharesService } from './http/shares.service';
import { ReviewService } from './http/review.service';
import { PagerService } from './pager.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({})
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [
                RoomService,
                SharesService,
                ReviewService,
                PagerService
            ]
        };
    }
}
