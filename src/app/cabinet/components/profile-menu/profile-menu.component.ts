import {Component} from '@angular/core';
import {ProfileMenuModel} from "../../../models/profile/profile-menu.model";


@Component({
  moduleId: module.id,
  selector: 'app-cabinet-profile-menu',
  templateUrl: 'profile-menu.component.html',
  styleUrls: ['profile-menu.component.scss']
})

export class ProfileMenuComponent {
  activeMenuItem: string;

  profileMenuItems: ProfileMenuModel[] = [
    {
      url: 'history',
      name: 'History',
      isActive: false
    },
    {
      url: 'gallery',
      name: 'Gallery',
      isActive: false
    },
    {
      url: 'favorites',
      name: 'Favorites',
      isActive: false
    },
    {
      url: 'friends',
      name: 'My friends',
      isActive: false
    },
    {
      url: 'reviews',
      name: 'Reviews',
      isActive: false
    },
  ];

  constructor() {
    this.checkActiveMenuItem();
  }

  checkActiveMenuItem() {
    setTimeout(() => {
      this.activeMenuItem = window.location.pathname.split('/')[2];
      this.profileMenuItems.forEach((menuItem: ProfileMenuModel) => {
        menuItem.isActive = menuItem.url === this.activeMenuItem;
      });
    }, 100);
  }
}

