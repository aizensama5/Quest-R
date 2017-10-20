import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {ReceivingMessagesModel} from "../../models/receiving-messages.model";

@Injectable()
export class ConfigService {
  private static readonly dataBaseName = 'config/';

  constructor(private databaseService: AngularFireDatabase) {}

  changeMaxCountOfPlayers(count: number): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(ConfigService.dataBaseName + 'general/maxCountOfPlayers').set(count);
  }

  changeReceivingMessages(receivingMessages: any): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(ConfigService.dataBaseName + 'receiving_messages').set(receivingMessages);
  }

  receivingMessages(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(ConfigService.dataBaseName + 'receiving_messages');
  }

  maxCountOfPlayers(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(ConfigService.dataBaseName + 'general');
  }
}
