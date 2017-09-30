import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RoomService } from './http/room.service';
import {RoomModel} from '../models/room.model';

@Injectable()
export class EditRoomsResolverService {

  constructor(public roomService: RoomService) {}

  resolve(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return new Promise((resolve, reject) => {
      this.roomService.roomById(parseInt(router.params.id, 10)).subscribe((room: RoomModel[]) => {
        resolve(room[0]);
      });
    });
  }

}
