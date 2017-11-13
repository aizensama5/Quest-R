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

  transform(roomId: number): string {
    return this.getRoomNameByRoomId(roomId).name.def;
  }

  getRoomNameByRoomId(roomId: number): RoomModel {
    let room: RoomModel = new RoomModel();
    this.roomService.all().subscribe((rooms: RoomModel[]) => {
      room = this.roomService.getRoomById(roomId, rooms);
    });
    return room;
  }

}
