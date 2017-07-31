import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {RoomModule} from '../room/room.module';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MainComponent },
            { path: 'room', loadChildren: 'app/room/room.module#RoomModule' }
        ])
    ],
    exports: [RouterModule]
})
export class MainRoutingModule { }
