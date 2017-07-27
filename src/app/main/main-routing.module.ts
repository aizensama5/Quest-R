import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: MainComponent },
            { path: '/room', loadChildren: 'app/room/room.module#RoomModule' }
        ])
    ],
    exports: [RouterModule]
})
export class MainRoutingModule { }
