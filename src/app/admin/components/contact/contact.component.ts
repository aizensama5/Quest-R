import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../../service/http/contact.service";
import {CompanyInfoModel} from "../../../models/company-info.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactInfo: CompanyInfoModel[] = [];
  preparedContactInfo: any[] = [];
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  constructor(
    private contactService: ContactService
  ) {
    contactService.companyInfo().subscribe((contactInfo: CompanyInfoModel[]) => {
      this.contactInfo = contactInfo;
      this.contactInfo.forEach((contInfo: any) => {
        this.preparedContactInfo[contInfo.$key] = contInfo.$value;
      });
    });
  }

  ngOnInit() {
  }

  save() {
    console.log(this.contactInfo);
  }
}
