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
    private user: Observable<firebase.User>;


  links: MenuLinkModel[] = [
      {
        name: 'Квесты',
        target: 'quests'
      },
      {
        name: 'Как играть',
        target: 'org-rule'
      },
      {
        name: 'Акции',
        target: 'shares',
      },
      {
        name: 'Отзывы',
        target: 'reviews',
      },
      {
        name: 'Контакты',
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
