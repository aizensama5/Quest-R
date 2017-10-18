import { Injectable } from '@angular/core';
import { MarkingModel } from '../models/marking.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class MarkingService {
  private static readonly dataBaseName = 'marking/';

  constructor(private databaseService: AngularFireDatabase) {}

  addMarking(marking: MarkingModel): Promise<void> {
    return <Promise<void>>this.databaseService.object(MarkingService.dataBaseName + marking.id).set(marking.toJSON());
  }

  all(): FirebaseListObservable<MarkingModel[]> {
    return <FirebaseListObservable<MarkingModel[]>>this.databaseService
      .list(MarkingService.dataBaseName)
      .map((items) => items.map(MarkingModel.fromJSON));
  }
}
