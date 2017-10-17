import { Injectable } from '@angular/core';
import { ComplexityModel } from '../models/complexity.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ComplexityService {
  private static readonly dataBaseName = 'complexity/';

  constructor(private databaseService: AngularFireDatabase) {}

  addComplexity(complexity: ComplexityModel): Promise<void> {
    return <Promise<void>>this.databaseService.object(ComplexityService.dataBaseName + complexity.id).set(complexity.toJSON());
  }

  all(): FirebaseListObservable<ComplexityModel[]> {
    return <FirebaseListObservable<ComplexityModel[]>>this.databaseService
      .list(ComplexityService.dataBaseName)
      .map((items) => items.map(ComplexityModel.fromJSON));
  }
}
