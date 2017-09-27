import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../../service/http/authentication.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Output() onSideBarToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  is_displaySideBar = true;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  toggleSidebarMenu() {
    console.log(this.is_displaySideBar);
    this.is_displaySideBar = !this.is_displaySideBar;
    this.onSideBarToggle.emit(this.is_displaySideBar);
  }

  logout() {
    this.authService.logout();
  }

}
