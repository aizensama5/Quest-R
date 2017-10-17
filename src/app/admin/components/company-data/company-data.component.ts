import {Component, OnInit } from '@angular/core';
import {CompanyModel} from '../../../models/company.model';
import {CompanySecurityModel} from '../../../models/company-security.model';
import {CompanyService} from '../../../service/http/company.service';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.scss']
})
export class CompanyDataComponent implements OnInit {
  companyData: CompanyModel = new CompanyModel();
  initialCompanyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  constructor(
    private companyService: CompanyService
  ) {
    this.isShowLoader = true;
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.initialCompanyData = companyData[0];
      this.companyData = companyData[0];
      this.isShowLoader = false;
    });
  }

  isFormChanges(): boolean {
    let isChanges = false;
    let inCDataCounter = 0;
    let cDataCounter = 0;
    console.log(this.initialCompanyData);
    console.log(this.companyData);
    Object.keys(this.initialCompanyData).map((inCData: any) => {
      Object.keys(this.companyData).map((cData: any) => {
        if (cDataCounter === inCDataCounter && inCData !== cData) {
          isChanges = true;
        }
        cDataCounter++;
      });
      inCDataCounter++;
    });
    return isChanges;
  }

  save() {
    this.isShowLoader = true;
    if (!this.areErrors) {
      this.companyService.changeCompanyData(this.companyData)
        .then(() => {
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = 'Успешно сохранено';
        })
        .catch(() => {
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = 'Ошибка при сохранении';
        });
    } else {
      this.isShowLoader = false;
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Ошибка при загрузке файла';
    }
  }

  onImageUploaded(image: any) {
    if (!image.error && image.src) {
      this.companyData.logo = image.src;
      this.areErrors = false;
    } else {
      this.areErrors = true;
    }
  }

  deleteImage() {
    this.companyData.logo = '';
  }

  ngOnInit() {
  }

  closePopup () {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }
}
