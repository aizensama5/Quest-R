import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../models/user.model';

@Injectable()

export class UserService {
  private users: UserModel[] = [{
    id: 1,
    name: 'Best',
    surname: 'User',
    img: 'http://loremflickr.com/150/150/face',
    level: 30,
    roomsPassed: 3,
    token: 'sdasda3121dsq1'
  }];

  getUserById (userId: number): UserModel {
    const users = this.users;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      for (const key in user) {
        if (user.id === userId) {
          return user;
        }
      }
    }
    return;
  }

  constructor() {
  }

  /**
   * Get all rooms.
   * @returns <Observable<UserModel[]>>
   */
  all(): Observable<UserModel[]> {
    return Observable.of(this.users);
  }
}


