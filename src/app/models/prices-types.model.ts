import { PriceCountPlayersDependenceModel } from './price-countPlayers-dependence.model';

export class PricesTypesModel {
  id: number;
  name: string;
  prices: PriceCountPlayersDependenceModel[];

  constructor () {
    this.id = null;
    this.name = '';
    this.prices = [];
  }
}
