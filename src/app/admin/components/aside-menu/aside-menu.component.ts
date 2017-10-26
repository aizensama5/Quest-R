import {Component, OnInit, ViewChildren, ElementRef, AfterViewInit} from '@angular/core';
import {RoomService} from '../../../service/http/room.service';
import {RoomModel} from '../../../models/room.model';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit, AfterViewInit {
  rooms: RoomModel[] = [];
  @ViewChildren('a') asideRouteLinks: ElementRef[];
  @ViewChildren('roomDaySettingsLink') roomDaySettingsLinks: ElementRef[];

  constructor(private roomService: RoomService) {
    roomService.all().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkMenuOnLoad();
  }

  checkMenuOnLoad() {
    setTimeout(() => {
      this.asideRouteLinks.forEach((routeLink: ElementRef) => {
        if (routeLink.nativeElement.href && routeLink.nativeElement.href === window.location.href) {
          routeLink.nativeElement.closest('.treeview')
            .setAttribute('class', 'treeview dropdown treeview-show treeview-active');
          if (routeLink.nativeElement.closest('.treeview-submenu')) {
            routeLink.nativeElement.closest('.treeview-submenu')
              .setAttribute('class', 'treeview-submenu dropdown treeview-dropdown treeview-submenu-show treeview-submenu-active');
            routeLink.nativeElement.closest('.treeview-submenu').setAttribute('id', 'active-submenu-item');
          }
          routeLink.nativeElement.setAttribute('id', 'active-menu-item');
        }
      });
    }, 500);
  }

  fixActiveMenuItem(linkElement: HTMLLinkElement) {
    this.clearMenuItems();
    this.clearActiveMenuItems(linkElement);
    this.clearSubmenuItems();
    linkElement.setAttribute('id', 'active-menu-item');
    linkElement.closest('.treeview')
      .setAttribute('class', 'treeview dropdown treeview-show treeview-active');
  }


  toggleActiveMenuItem(linkElement: HTMLLinkElement) {
    if (window.location.href === linkElement.href) {
      linkElement.closest('.treeview')
        .setAttribute('class', 'treeview dropdown treeview-active treeview-show');
      return;
    }
    if (linkElement.closest('.treeview').getAttribute('class').indexOf('treeview-show') !== -1) {
      linkElement.closest('.treeview')
        .setAttribute('class', 'treeview dropdown');
    } else {
      linkElement.closest('.treeview')
        .setAttribute('class', 'treeview dropdown treeview-show');
    }
  }

  clearMenuItems() {
    const treeviewElement = document.getElementsByClassName('treeview');
    for (let i = 0; i < treeviewElement.length; i++) {
      treeviewElement[i].setAttribute('class', 'treeview dropdown');
    }
  }

  clearActiveMenuItems(linkElement: HTMLLinkElement) {
    if (linkElement.closest('.treeview').getAttribute('class').indexOf('show') !== -1) {
      linkElement.closest('.treeview').setAttribute('class', 'treeview dropdown');
    }
    const activeMenuItem = document.getElementById('active-menu-item');
    const activeSubMenuItem = document.getElementById('active-submenu-item');
    if (activeMenuItem) {
      activeMenuItem.setAttribute('id', '');
    }
    if (activeSubMenuItem) {
      activeSubMenuItem.setAttribute('id', '');
    }
  }

  fixActiveSubMenuItem() {
    let linkElement: HTMLLinkElement;
    this.roomDaySettingsLinks.some((link: ElementRef) => {
      linkElement = link.nativeElement;
      this.clearSubmenuItems();
      this.clearActiveSubmenuItems(linkElement);
      this.clearMenuItems();
      linkElement.closest('.treeview-submenu')
        .setAttribute('class', 'treeview-submenu dropdown treeview-dropdown treeview-submenu-show treeview-submenu-active');
      linkElement.closest('.treeview')
        .setAttribute('class', 'treeview dropdown treeview-show treeview-active');
      this.checkActiveSubMenuItem();
      return true;
    });
  }

  toggleActiveSubMenuItem() {
    let linkElement: HTMLLinkElement;
    this.roomDaySettingsLinks.some((link: ElementRef) => {
      linkElement = link.nativeElement;
      if (linkElement && linkElement.closest('.treeview-submenu').getAttribute('class').indexOf('treeview-submenu-show') !== -1) {
        linkElement.closest('.treeview-submenu')
          .setAttribute('class', 'dropdown treeview-submenu dropdown-submenu');
      } else {
        linkElement.closest('.treeview-submenu')
          .setAttribute('class', 'dropdown treeview-submenu dropdown-submenu treeview-submenu-show');
      }
      return true;
    });
  }

  clearActiveSubmenuItems(linkElement: HTMLLinkElement) {
    if (linkElement.closest('.treeview-submenu').getAttribute('class').indexOf('show') !== -1) {
      linkElement.closest('.treeview-submenu').setAttribute('class', 'dropdown treeview-submenu treeview-dropdown');
    }
    const activeMenuItem = document.getElementById('active-menu-item');
    const activeSubMenuItem = document.getElementById('active-submenu-item');
    if (activeMenuItem) {
      activeMenuItem.setAttribute('id', '');
    }
    if (activeSubMenuItem) {
      activeSubMenuItem.setAttribute('id', '');
    }
  }

  clearSubmenuItems() {
    const treeviewElement = document.getElementsByClassName('treeview-submenu');
    for (let i = 0; i < treeviewElement.length; i++) {
      treeviewElement[i].setAttribute('class', 'dropdown treeview-submenu dropdown-submenu');
    }
  }

  checkActiveSubMenuItem() {
    setTimeout(() => {
      this.roomDaySettingsLinks.forEach((routeLink: ElementRef) => {
        if (routeLink.nativeElement.href && routeLink.nativeElement.href === window.location.href) {
          routeLink.nativeElement.setAttribute('id', 'active-menu-item');
          routeLink.nativeElement.closest('.treeview-submenu').setAttribute('id', 'active-submenu-item');
        }
      });
    }, 100);

  }
}
