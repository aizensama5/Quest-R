import { Component } from '@angular/core';
import { CompanyModel } from '../../../models/company.model';
import { CompanySecurityModel } from '../../../models/company-security.model';
import { CompanyService } from '../../../service/http/company.service';
import { LanguageService } from "../../../service/language.service";
import { LanguageModel } from "../../../models/language.model";

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.scss'],
})
export class CompanyDataComponent {
  companyData: CompanyModel = new CompanyModel();
  initialCompanyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;
  useTabsetWithTextarea: boolean;

  constructor(
    private companyService: CompanyService,
    public languageService: LanguageService
  ) {
    this.useTabsetWithTextarea = true;
    this.isShowLoader = true;
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.initialCompanyData = companyData[0];
      this.companyData = companyData[0];
      this.isShowLoader = false;
    });
  }

  save() {
    this.isShowLoader = true;
    if (!this.areErrors) {
      this.companyService.changeCompanyData(this.companyData)
        .then(() => {
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = 'Saved';
        })
        .catch(() => {
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = 'Error';
        });
    } else {
      this.isShowLoader = false;
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Error';
    }
  }



  closePopup () {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

  onTabsetChanged(tabsetInfo: LanguageModel) {
    this.companyData.aboutCompany = tabsetInfo;
  }
}
