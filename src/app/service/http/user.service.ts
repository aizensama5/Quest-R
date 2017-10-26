import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  private static readonly dataBaseName = 'user/';

  userById (userId: string, users: UserModel[]): UserModel {
    return users.filter((user: UserModel) => user.id === userId)[0] || new UserModel();
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


