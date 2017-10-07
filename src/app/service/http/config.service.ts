import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ConfigService {
  private static readonly dataBaseName = 'config/';

  constructor(private databaseService: AngularFireDatabase) {}

  changeMaxCountOfPlayers(count: number): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(ConfigService.dataBaseName + 'general/maxCountOfPlayers').set(count);
  }

  maxCountOfPlayers(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(ConfigService.dataBaseName + 'general');
  }
}
