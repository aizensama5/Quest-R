import {Component, Injectable, OnInit} from '@angular/core';
import {RoomModel} from '../../../models/room.model';
import {RoomService} from '../../../service/http/room.service';
import {ActivatedRoute} from '@angular/router';
import {MarkingModel} from '../../../models/marking.model';
import {UserRoomHistoryService} from "../../../service/http/user-room-history.service";
import {UserHistoryService} from "../../../service/user-history.service";
import {UserHistoryModel} from "../../../models/user-history.model";
import {UserService} from "../../../service/http/user.service";
import {UserModel} from "../../../models/user.model";


@Component({
  moduleId: module.id,
  selector: 'app-room-info',
  templateUrl: 'room.component.html',
  styleUrls: ['room.component.scss']
})
@Injectable()
export class RoomInfoComponent implements OnInit {
  room: RoomModel;
  rooms: RoomModel[] = [];
  isShowRoomGallery = false;
  isExistRoom = false;

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private userHistoryService: UserHistoryService,
              private userService: UserService) {
    this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
      let roomId = +this.route.snapshot.params.id;
      rooms.forEach((room: RoomModel) => {
        if (room.id === roomId) {
          this.isExistRoom = true;
        }
      });
      if (this.isExistRoom) {
        this.roomService.roomById(roomId).subscribe((room: RoomModel[]) => {
          this.room = room[0];
          this.userService.all().subscribe((users: UserModel[]) => {
            if (users) {
              users.forEach((user: UserModel) => {
                this.getUserHistories(user.id)
                  .then((userHistories) => {
                    if (userHistories && userHistories[0]) {
                      userHistories.forEach((usersHistory) => {
                        this.room.gallery = this.room.gallery.concat(usersHistory.photos);
                      });
                      if (!this.room.gallery[this.room.gallery.length - 1]) {
                        this.room.gallery.pop();
                      }
                    }
                  });
              });
            }
          });
          let markingIndex = 1;
        });
      }
    });
  }

  getUserHistories(userId): Promise<any[]> {
    return new Promise((resolve) => {
        this.userHistoryService.getUserHistoriesById(userId).subscribe((userHistories: UserHistoryModel[]) => {
            if (userHistories.length) {
              this.userHistoryService.getAvailableUserHistoryByRoomId(userHistories, this.room.id)
                .then((histories: UserHistoryModel[]) => {
                  resolve(histories);
                })
            }
          }
        );
      }
    )
  }

  ngOnInit() {
  }

  onGalleryOpen() {
    this.isShowRoomGallery = true;
  }

  onGalleryClose(isDisplay: boolean) {
    this.isShowRoomGallery = isDisplay;
  }
}
