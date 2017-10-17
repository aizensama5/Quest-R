import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../../service/http/authentication.service';
import {CompanyModel} from '../../../models/company.model';
import {CompanyService} from '../../../service/http/company.service';
import {CompanySecurityModel} from '../../../models/company-security.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Output() onSideBarToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  is_displaySideBar = true;
  companyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));

  constructor(
    private authService: AuthenticationService,
    companyService: CompanyService
  ) {
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
    });
  }

  ngOnInit() {
  }

  toggleSidebarMenu() {
    this.is_displaySideBar = !this.is_displaySideBar;
    this.onSideBarToggle.emit(this.is_displaySideBar);
  }

  logout() {
    this.authService.adminLogout();
  }

}
