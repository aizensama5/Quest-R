import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../service/http/config.service';
import { ReceivingMessagesModel } from "../../../models/receiving-messages.model";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  static readonly COUNT_SUBSCRIBING = 2;
  maxCountOfPlayers: number;
  receivingMessagesConf: any[] = [];
  isShowLoader: boolean;
  initializedItems = 0;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  constructor(private configService: ConfigService) {
    this.isShowLoader = true;
    configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = count[0].$value || 0;
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
        this.isShowLoader = false;
        this.notificationPopupMessage = 'Saved';
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
    console.log(this.receivingMessagesConf['emailAddresses'].split(' '));
    // if ()
    this.configService.changeReceivingMessages(this.receivingMessagesConf)
      .then(() => {
        this.isShowLoader = false;
        this.notificationPopupMessage = 'Saved';
      })
      .catch(() => {
        this.isShowLoader = false;
        this.notificationPopupMessage = 'Saved';
        this.areErrors = true;
      });
  }
}
