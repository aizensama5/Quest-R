import { Pipe, PipeTransform } from '@angular/core';
import { RoomService } from "../service/http/room.service";
import { RoomModel } from "../models/room.model";

@Pipe({
  name: 'roomName'
})
export class RoomNamePipe implements PipeTransform {

  constructor(public roomService: RoomService) {}

  transform(roomId: number, language: string): string {
    return this.getRoomNameByRoomId(roomId).name[language];
  }

  getRoomNameByRoomId(roomId: number): RoomModel {
    let room: RoomModel = new RoomModel();
    this.roomService.all().subscribe((rooms: RoomModel[]) => {
      room = this.roomService.getRoomById(roomId, rooms);
    });
    return room;
  }

}
