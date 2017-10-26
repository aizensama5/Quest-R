import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../../service/http/contact.service";
import {CompanyInfoModel} from "../../../models/company-info.model";
import {LanguageModel} from "../../../models/language.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactInfo: CompanyInfoModel = new CompanyInfoModel();
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;
  useTabsetWithInput: boolean;

  constructor(
    private contactService: ContactService
  ) {
    this.useTabsetWithInput = true;
    contactService.companyInfo().subscribe((contactInfo: CompanyInfoModel[]) => {
      this.contactInfo = contactInfo[0];
    });
  }

  ngOnInit() {
  }

  closePopup() {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
    this.areErrors = false;
  }

  save() {
    this.isShowLoader = true;
    this.isShowNotificationPopup = true;
    this.areErrors = false;
    this.contactService.changeCompanyInfo(this.contactInfo)
      .then(() => {
        this.notificationPopupMessage = 'Saved';
        this.isShowLoader = false;
      })
      .catch(() => {
        this.notificationPopupMessage = 'Error';
        this.isShowLoader = false;
        this.areErrors = true;
      });
  }

  onTabsetChanged(tabsetInfo: LanguageModel) {
    this.contactInfo.address = tabsetInfo;
  }
}
