import { Pipe, PipeTransform } from '@angular/core';
import { RoomService } from "../service/http/room.service";
import { RoomModel } from "../models/room.model";
import { ActivatedRoute } from "@angular/router";
import {Observable} from "rxjs/Observable";


@Pipe({
  name: 'roomName'
})
export class RoomNamePipe implements PipeTransform {
  currentLanguage: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public roomService: RoomService
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.currentLanguage = data['locale'];
    })
  }

  transform(roomId: number): Promise<string> {
    return this.getRoomNameByRoomId(roomId);
  }

  getRoomNameByRoomId(roomId: number): Promise<string> {
    return new Promise((resolve) => {
      this.roomService.all().subscribe((rooms: RoomModel[]) => {
        resolve(this.roomService.getRoomById(roomId, rooms).name.def);
      });
    });
  }
}
