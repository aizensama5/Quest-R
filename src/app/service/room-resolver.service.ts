import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {RoomService} from "./http/room.service";
import {RoomModel} from "../models/room.model";

@Injectable()
export class RoomResolverService {

  constructor(private roomService: RoomService) { }

  resolve(): Observable<any> | Promise<any> | any {
    return new Promise((resolve) => {
      this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
        resolve(rooms);
      });
    });
  }
}
