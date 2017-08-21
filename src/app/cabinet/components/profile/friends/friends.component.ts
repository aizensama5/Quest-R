import { Component } from '@angular/core';
import {FriendModel} from '../../../../models/profile/friend.model';
import {FriendsService} from '../../../../service/profile/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  friendsData: FriendModel[];

  constructor( friendsService: FriendsService ) {
    friendsService.all().subscribe((frndsData) => {
      this.friendsData = frndsData;
    });
  }

}
