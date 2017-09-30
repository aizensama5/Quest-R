import { Component, OnInit } from '@angular/core';
import { CompanyModel} from '../../../models/company.model';
import { CompanySecurityModel } from '../../../models/company-security.model';
import { CompanyService } from '../../../service/http/company.service';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.scss']
})
export class AdminRoomsComponent implements OnInit {
  companyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));
  rooms: RoomModel[] = [];
  allRooms: RoomModel[] = [];
  newRoom: RoomModel = new RoomModel();

  constructor(
    private companyService: CompanyService,
    public roomService: RoomService
  ) {
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
    });
    roomService.roomsByCompanyId(this.currentCompany.id).subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
    this.roomService.all().subscribe((rooms: RoomModel[]) => {
      this.allRooms = rooms;
      console.log(this.allRooms);
    });
  }

  ngOnInit() {
  }

  addNewRoom(roomName: string) {
    if (roomName.length) {
      this.newRoom.id = this.roomService.lastId(this.allRooms) + 1;
      this.newRoom.name = roomName;
      this.newRoom.companyId = this.currentCompany.id;
      this.rooms.push(this.newRoom);
      this.roomService.addRoom(this.newRoom)
        .then(() => {
          this.newRoom = new RoomModel();
        })
        .catch((error) => { console.log(error); });
    }
  }
}
