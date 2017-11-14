import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../../service/http/authentication.service';
import {CompanyModel} from '../../../models/company.model';
import {CompanyService} from '../../../service/http/company.service';
import {CompanySecurityModel} from '../../../models/company-security.model';
import {Router} from "@angular/router";

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

  constructor(private authService: AuthenticationService,
              private companyService: CompanyService,
              private router: Router) {
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

  backToWebsite() {
    this.router.navigate(['/'])
      .then(() => {
        document.body.style.backgroundColor = '';
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = 'none';
        document.body.style.backgroundImage = 'linear-gradient(214deg, #000000, #2a2c2e 54%, #131313);';
      });
  }

  logout() {
    this.authService.adminLogout();
  }

}
