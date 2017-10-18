import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class DescriptionService {
  private static readonly dataBaseName = 'description';

  constructor(private databaseService: AngularFireDatabase) {}

  changeDescription(description: string): Promise<void> {
    return <Promise<void>>this.databaseService.object(DescriptionService.dataBaseName).set(description);
  }

  getCurrentDescription(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(DescriptionService.dataBaseName);
  }
}
