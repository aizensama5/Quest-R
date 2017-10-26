import { Component, OnInit } from '@angular/core';
import { MenuLinkModel } from '../../../models/menu-link.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../../../service/http/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'app-layout-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    isShowLoginPopup = false;
    user: Observable<firebase.User>;


  links: MenuLinkModel[] = [
      {
        name: 'Quests',
        target: 'quests'
      },
      {
        name: 'How to play',
        target: 'org-rule'
      },
      {
        name: 'Promotions',
        target: 'shares',
      },
      {
        name: 'Reviews',
        target: 'reviews',
      },
      {
        name: 'Contacts',
        target: 'contacts'
      }
    ];

    constructor(private authService: AuthenticationService) {
      this.user = authService.currentUser();
    }

    ngOnInit() {
    }

    scrollTo(target) {
      document.getElementById(target).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }

    showLoginPopup() {
      this.isShowLoginPopup = true;
    }

    closeLoginPopup() {
      this.isShowLoginPopup = false;
    }

    logout() {
      this.authService.logout();
    }
}
