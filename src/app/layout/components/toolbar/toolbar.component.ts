import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuLinkModel } from '../../../models/menu-link.model';

@Component({
    moduleId: module.id,
    selector: 'app-layout-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Output() showLoginPopup = false;

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

    constructor() {
    }

    ngOnInit() {
    }

    scrollTo(target) {
      document.getElementById(target).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }

    showPopup() {
      this.showLoginPopup = true;
    }
}
