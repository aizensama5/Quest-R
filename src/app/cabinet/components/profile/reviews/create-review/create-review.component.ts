import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ProfileReviewModel} from '../../../../../models/profile/profileReview.model';
import {RoomService} from '../../../../../service/http/room.service';
import {RoomModel} from '../../../../../models/room.model';
import {ProfileReviewService} from '../../../../../service/profile/profileReview.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  newReview: any = {};
  rooms: RoomModel[];
  profileReviewService: ProfileReviewService = new ProfileReviewService();


  constructor(roomService: RoomService) {
    roomService.all().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  save (room: HTMLSelectElement, visitDate: HTMLInputElement, review: HTMLTextAreaElement) {
    this.newReview = {
      id: 3,
      user_id: 1,
      roomName: room.value,
      created: new Date().toJSON().slice(0, 10).replace(/-/g,'.'),
      visited: visitDate.value,
      description: review.value
    };
    this.profileReviewService.addReview(this.newReview).subscribe((res) => {});
  }

  ngOnInit() {
  }

}
