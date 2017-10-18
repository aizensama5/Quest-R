import { Component, OnInit } from '@angular/core';
import { CompanyModel } from '../../../models/company.model';
import { CompanySecurityModel } from '../../../models/company-security.model';
import { CompanyService } from '../../../service/http/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  companyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));

  constructor(companyService: CompanyService) {
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
    });
  }

  ngOnInit() {
  }

}
