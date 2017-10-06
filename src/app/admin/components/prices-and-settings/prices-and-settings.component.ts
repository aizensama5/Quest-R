import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/http/config.service';
import { PricesTypesModel } from '../../../models/prices-types.model';
import { PriceCountPlayersDependenceModel } from '../../../models/price-countPlayers-dependence.model';

@Component({
  selector: 'app-prices-and-settings',
  templateUrl: './prices-and-settings.component.html',
  styleUrls: ['./prices-and-settings.component.scss']
})
export class PricesAndSettingsComponent implements OnInit {
  static defaultMaxCountOfPlayers = 8;
  maxCountOfPlayers: number;
  countItems: number[] = [];
  priceType: PricesTypesModel;
  priceCountPlayersDependence: PriceCountPlayersDependenceModel = new PriceCountPlayersDependenceModel();

  constructor(private configService: ConfigService) {
    this.priceType = new PricesTypesModel();
    this.priceCountPlayersDependence = new PriceCountPlayersDependenceModel();
    configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = count[0].$value || PricesAndSettingsComponent.defaultMaxCountOfPlayers;
      for (let i = 1; i <= this.maxCountOfPlayers; i++) {
        this.countItems.push(i);
        this.priceType.prices[i] = this.priceCountPlayersDependence;
      }
      console.log(this.priceType);
      console.log(this.priceCountPlayersDependence);
    });
  }

  ngOnInit() {
  }

  addNewType() {
    console.log(this.priceType);
  }

}
