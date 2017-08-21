import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FriendModel } from '../../models/profile/friend.model';

@Injectable()

export class FriendsService {
  private friends: FriendModel[] = [
    {
      id: 2,
      firstName: 'Name',
      lastName: 'S.',
      profilePhoto: 'http://loremflickr.com/500/500/travel',
      facebookLink: 'https://www.facebook.com/profile.php?id=100015025326946'
    },
    {
      id: 3,
      firstName: 'Name',
      lastName: 'S.',
      profilePhoto: 'http://loremflickr.com/500/500/travel',
      facebookLink: 'https://www.facebook.com/profile.php?id=100015025326946'
    },
    {
      id: 4,
      firstName: 'Name',
      lastName: 'S.',
      profilePhoto: 'http://loremflickr.com/500/500/travel',
      facebookLink: 'https://www.facebook.com/profile.php?id=100015025326946'
    },
    {
      id: 5,
      firstName: 'Name',
      lastName: 'S.',
      profilePhoto: 'http://loremflickr.com/500/500/travel',
      facebookLink: 'https://www.facebook.com/profile.php?id=100015025326946'
    },
    {
      id: 6,
      firstName: 'Name',
      lastName: 'S.',
      profilePhoto: 'http://loremflickr.com/500/500/travel',
      facebookLink: 'https://www.facebook.com/profile.php?id=100015025326946'
    },
    {
      id: 7,
      firstName: 'Name',
      lastName: 'S.',
      profilePhoto: 'http://loremflickr.com/500/500/travel',
      facebookLink: 'https://www.facebook.com/profile.php?id=100015025326946'
    },
    {
      id: 8,
      firstName: 'Name',
      lastName: 'S.',
      profilePhoto: 'http://loremflickr.com/500/500/travel',
      facebookLink: 'https://www.facebook.com/profile.php?id=100015025326946'
    }
  ];

  /**
   * Get all user's friends.
   * @returns <Observable<FriendModel[]>>
   */
  all(): Observable<FriendModel[]> {
    return Observable.of(this.friends);
  }

  constructor () {}
}
