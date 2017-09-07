import { Injectable } from '@angular/core';
import { SharesModel } from '../../models/shares.model';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class SharesService {
    private static readonly dataBaseName = 'share/';

    constructor(private dataBaseService: AngularFireDatabase) {}

    addShare(share: SharesModel): Promise<void> {
      return <Promise<void>>this.dataBaseService.object(SharesService.dataBaseName + share.id).set(share.toJSON());
    }

    all(): FirebaseListObservable<SharesModel[]> {
      return <FirebaseListObservable<SharesModel[]>>this.dataBaseService
        .list(SharesService.dataBaseName)
        .map((items) => items.map(SharesModel.fromJSON));
    }
}
