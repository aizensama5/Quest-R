import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/http/config.service';
import { PricesTypesModel } from '../../../models/prices-types.model';
import { PriceCountPlayersDependenceModel } from '../../../models/price-countPlayers-dependence.model';
import { PricesTypesService } from '../../../service/prices-types.service';

@Component({
  selector: 'app-prices-and-settings',
  templateUrl: './prices-and-settings.component.html',
  styleUrls: ['./prices-and-settings.component.scss']
})
export class PricesAndSettingsComponent implements OnInit {
  static defaultMaxCountOfPlayers = 8;
  static countSubscribing = 2;
  maxCountOfPlayers: number;
  countItems: number[] = [];
  pricesTypes: PricesTypesModel[] = [];
  newPriceType: PricesTypesModel;
  initializedItems = 0;
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  notificationPopupMessageColor = '';
  areErrors: boolean;
  deletedTypeId: number;

  constructor(
    private configService: ConfigService,
    protected priceTypeService: PricesTypesService
  ) {
    this.isShowLoader = true;
    this.newPriceType = new PricesTypesModel();
    configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = parseInt(count[0].$value, 10) || PricesAndSettingsComponent.defaultMaxCountOfPlayers;
      this.initPriceCountDependence();
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    priceTypeService.all().subscribe((pricesTypes: PricesTypesModel[]) => {
      this.pricesTypes = pricesTypes;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
  }

  initPriceCountDependence() {
    for (let countOfPlayers = 0; countOfPlayers < this.maxCountOfPlayers; countOfPlayers++) {
      this.countItems.push(countOfPlayers);
      this.newPriceType.prices[countOfPlayers] = new PriceCountPlayersDependenceModel();
      this.newPriceType.prices[countOfPlayers].countPlayers = countOfPlayers + 1;
    }
  }

  reInitPriceCountDependence() {
    this.countItems = [];
    this.initPriceCountDependence();
  }

  ngOnInit() {
  }

  isEverythingLoaded() {
    if (this.initializedItems === PricesAndSettingsComponent.countSubscribing) {
      this.isShowLoader = false;
    }
  }

  addNewType() {
    this.isShowLoader = true;
    this.areErrors = false;
    this.newPriceType.prices.forEach((PCPDependence: PriceCountPlayersDependenceModel) => {
      if (PCPDependence.price === null || PCPDependence.countPlayers === null || this.newPriceType.name === '') {
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Заполните все поля';
        this.areErrors = true;
      }
    });
    if (!this.areErrors) {
      this.newPriceType.id = this.priceTypeService.lastId(this.pricesTypes) + 1;
      this.priceTypeService.addPriceType(this.newPriceType).then(() => {
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Тип цен добавлен';
        this.newPriceType = new PricesTypesModel();
        this.reInitPriceCountDependence();
      });
    }
  }

  deleteType(id: number) {
    this.isShowNotificationPopup = true;
    this.notificationPopupMessage = 'Действительно удалить?';
    this.areErrors = false;
    this.deletedTypeId = id;
  }

  confirmDeleteType(id: number) {
    this.isShowLoader = true;
    this.priceTypeService.deletePriceType(id).then(() => {
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Тип успешно удален';
      this.areErrors = false;
      this.isShowLoader = false;
    }, () => {
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Не удается удалить';
      this.areErrors = true;
      this.isShowLoader = false;
    });
    this.deletedTypeId = null;
  }

  closePopup () {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
    this.notificationPopupMessageColor = '';
  }

}
