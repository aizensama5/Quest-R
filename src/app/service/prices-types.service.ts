import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {PricesTypesModel} from '../models/prices-types.model';
import {PriceModel} from "../models/price.model";
import {PriceCountPlayersDependenceModel} from "../models/price-countPlayers-dependence.model";

@Injectable()
export class PricesTypesService {
  private static readonly dataBaseName = 'price-type/';

  constructor(private databaseService: AngularFireDatabase) {
  }

  addPriceType(priceType: PricesTypesModel): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(PricesTypesService.dataBaseName + priceType.id )
      .set(priceType);
  }

  all(): FirebaseListObservable<PricesTypesModel[]> {
    return <FirebaseListObservable<PricesTypesModel[]>>this.databaseService
      .list(PricesTypesService.dataBaseName);
  }

  getPriceTypeByPriceTypeId(priceTypes: PricesTypesModel[], priceTypeId: number) {
    return priceTypes.filter((priceType: PricesTypesModel) => priceType.id === priceTypeId)[0];
  }

  getMinPriceFromPriceList(priceList: PriceCountPlayersDependenceModel[]): number {
    let prices: number[] = [];
    priceList.forEach((price: PriceCountPlayersDependenceModel) => {
      prices.push(price.price);
    });
    return Math.max.apply(null, prices);
  }

  deletePriceType(id: number): Promise<void> {
    return <Promise<void>>this.databaseService.object(PricesTypesService.dataBaseName + id).remove();
  }

  lastId(types: PricesTypesModel[]): number {
    const typesIds: number[] = [];
    if (types.length) {
      types.forEach((type: PricesTypesModel) => {
        typesIds.push(type.id);
      });
    } else {
      typesIds.push(0);
    }
    return Math.max.apply(null, typesIds);
  }
}
