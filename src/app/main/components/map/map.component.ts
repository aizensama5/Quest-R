import {  Component, OnInit } from '@angular/core';
import { Marker } from '../../../models/marker.model';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../../../service/http/authentication.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { CompanyInfoModel } from '../../../models/company-info.model';
import { ContactService } from '../../../service/http/contact.service';
import {ContactQuestionModel} from '../../../models/contact-question.model';


@Component({
    moduleId: module.id,
    selector: 'app-main-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.scss']
})
export class MapComponent {

  marksRoom: Marker[] = [];
  firstMarkRoom: Marker = new Marker();
  companyInfo: CompanyInfoModel[];
  preparedCompanyInfo: any[] = [];
  user: Observable<firebase.User>;

  constructor(
      private _roomService: RoomService,
      private authService: AuthenticationService,
      private contactService: ContactService
    ) {
      this.getMarksRooms();
      this.user = authService.currentUser();
      contactService.companyInfo().subscribe((companyInfo: CompanyInfoModel[]) => {
        this.companyInfo = companyInfo;
        this.companyInfo.forEach((compInfo: any) => {
          this.preparedCompanyInfo[compInfo.$key] = compInfo.$value;
        });
      });
    }

    getMarksRooms() {
        this._roomService.all()
        .map((roomList: RoomModel[]) => roomList.map((room: RoomModel) => room.position))
        .subscribe((positionList: Marker[]) => {
            this.marksRoom = positionList;
            if (this.marksRoom.length > 0) {
              this.firstMarkRoom = this.marksRoom[0];
            }
        });
    }

    send(email, message) {
      let question: ContactQuestionModel = {
        email: email.value,
        message: message.value
      };
      this.contactService.addQuestion(question).then((success) => {
        question = new ContactQuestionModel();
      }, (error) => {
        console.log('error', error);
      });
    }
}
