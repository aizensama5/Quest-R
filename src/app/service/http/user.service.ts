import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  private static readonly dataBaseName = 'user/';

  static getUserById (users: UserModel[], userId: string) {
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

  getCoincidenceId (users: UserModel[], id: string) {
    let isCoincidence = false;
    users.filter((user: UserModel) => {
      if (id === user.id) {
        isCoincidence = true;
      }
    });
    return isCoincidence;
  }

  constructor(private dataBaseService: AngularFireDatabase) {}

  addUser(user: UserModel): Promise<void> {
    return <Promise<void>>this.dataBaseService.object(UserService.dataBaseName + user.id).set(user);
  }

  all(): FirebaseListObservable<UserModel[]> {
    return <FirebaseListObservable<UserModel[]>>this.dataBaseService
      .list(UserService.dataBaseName)
      .map((items) => items.map(UserModel.fromJSON));
  }
}


