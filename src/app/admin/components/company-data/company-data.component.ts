import { Component, OnInit } from '@angular/core';
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
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));


  constructor(private companyService: CompanyService) {
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
    });
  }

  save(filename) {
    console.log(filename.value);
    this.companyService.changeCompanyData(this.companyData)
      .then((success) => { console.log(success); })
      .catch((error) => { console.log(error); });
  }

  ngOnInit() {}
}
