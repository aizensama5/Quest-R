import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/http/config.service';
import { DescriptionService } from "../../../service/description.service";
import {LanguageModel} from "../../../models/language.model";
import {LanguageService} from "../../../service/language.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  static readonly COUNT_SUBSCRIBING = 4;
  description: LanguageModel = new LanguageModel();
  maxCountOfPlayers: number;
  receivingMessagesConf: any[] = [];
  isShowLoader: boolean;
  initializedItems = 0;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;
  useTabsetWithTextarea: boolean;
  currentLocale: string;

  constructor(
    private configService: ConfigService,
    public descService: DescriptionService,
    public langService: LanguageService
  ) {
    this.useTabsetWithTextarea = true;
    this.isShowLoader = true;
    configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = count[0].$value || 0;
      this.initializedItems++;
      this.isItemsInitialized();
    });
    langService.getCurrentLocale().subscribe((response: any[]) => {
      this.currentLocale = response[0].$value || 'en';
      this.initializedItems++;
      this.isItemsInitialized();
    });
    configService.receivingMessages().subscribe((receivingMessagesConf: any[]) => {
      receivingMessagesConf.forEach((recMesConf: any) => {
        this.receivingMessagesConf[recMesConf.$key] = recMesConf.$value;
      });
      this.initializedItems++;
      this.isItemsInitialized();
    });
    descService.getCurrentDescription().subscribe((description: LanguageModel[]) => {
      this.description = description[0];
      this.initializedItems++;
      this.isItemsInitialized();
    });
  }

  ngOnInit() {
  }

  isItemsInitialized() {
    if (this.initializedItems >= ConfigurationComponent.COUNT_SUBSCRIBING) {
      this.isShowLoader = false;
    }
  }

  saveGeneral() {
    this.areErrors = false;
    this.isShowLoader = true;
    this.isShowNotificationPopup = true;
    this.configService.changeMaxCountOfPlayers(this.maxCountOfPlayers)
      .then(() => {
        this.descService.changeDescription(this.description)
          .then(() => {
            this.isShowLoader = false;
            this.notificationPopupMessage = 'Saved';
          })
          .catch(() => {
            this.isShowLoader = false;
            this.notificationPopupMessage = 'Saved';
            this.areErrors = true;
          });
      })
      .catch(() => {
        this.isShowLoader = false;
        this.notificationPopupMessage = 'Saved';
        this.areErrors = true;
      });
  }

  closePopup () {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
    this.areErrors = false;
  }

  saveReceivingMessages() {
    this.areErrors = false;
    this.isShowLoader = true;
    this.isShowNotificationPopup = true;
    if (this.receivingMessagesConf['emailAddresses'].split('\n').length === this.receivingMessagesConf['emailAddresses'].split('@').length - 1) {
      this.configService.changeReceivingMessages(this.receivingMessagesConf)
        .then(() => {
          this.isShowLoader = false;
          this.notificationPopupMessage = 'Saved';
        })
        .catch(() => {
          this.isShowLoader = false;
          this.notificationPopupMessage = 'Error';
          this.areErrors = true;
        });
    } else {
      this.isShowLoader = false;
      this.notificationPopupMessage = 'Use one per line emails';
      this.areErrors = true;
    }
  }
  saveLocale() {
    this.areErrors = false;
    this.isShowLoader = true;
    this.isShowNotificationPopup = true;
    this.langService.changeCurrentLocale(this.currentLocale)
      .then(() => {
        this.isShowLoader = false;
        this.notificationPopupMessage = 'Saved';
      })
      .catch(() => {
        this.isShowLoader = false;
        this.notificationPopupMessage = 'Error';
        this.areErrors = true;
      })
  }

  onTabsetChanged(tabsetInfo: LanguageModel) {
    this.description = tabsetInfo;
  }
}
