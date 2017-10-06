import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {PricesTypesModel} from '../models/prices-types.model';

@Injectable()
export class PricesTypesService {
  private static readonly dataBaseName = 'price-type/';

  constructor(private databaseService: AngularFireDatabase) {}

  addPriceType(priceType: PricesTypesModel): Promise<void> {
    return <Promise<void>>this.databaseService.object(PricesTypesService.dataBaseName + priceType.id).set(priceType);
  }

  all(): FirebaseListObservable<PricesTypesModel[]> {
    return <FirebaseListObservable<PricesTypesModel[]>>this.databaseService
      .list(PricesTypesService.dataBaseName);
  }
}
