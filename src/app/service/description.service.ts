import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {LanguageModel} from "../models/language.model";

@Injectable()
export class DescriptionService {
  private static readonly dataBaseName = 'description/';

  constructor(private databaseService: AngularFireDatabase) {}

  changeDescription(description: LanguageModel): Promise<void> {
    return <Promise<void>>this.databaseService.object(DescriptionService.dataBaseName + '0/').set(description);
  }

  getCurrentDescription(): FirebaseListObservable<LanguageModel[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(DescriptionService.dataBaseName);
  }
}
