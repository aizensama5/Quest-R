import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class AdminMainComponent implements OnInit, OnDestroy, AfterViewInit {
  footerPadding = 17;
  is_displaySideBar = true;
  asideMenuElementWidth: number;

  static containerHeight(): number {
    return window.innerHeight - document.getElementById('header').offsetHeight;
  }

  constructor() {}

  ngOnInit() {
    document.getElementById('admin-main-container')
      .setAttribute('style', 'min-height: ' + AdminMainComponent.containerHeight() + 'px');
    document.body.style.backgroundColor = '#ECF0F5';
    document.body.style.backgroundImage = 'none';
  }

  ngAfterViewInit() {
    this.asideMenuElementWidth = document.getElementById('aside-menu').offsetWidth;
    this.checkFooterWidth(this.is_displaySideBar);
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundImage = 'linear-gradient(214deg, #000000, #2a2c2e 54%, #131313);';
  }

  onSideBarToggle (is_display: boolean) {
    this.is_displaySideBar = is_display;
    this.checkFooterWidth(is_display);
  }

  checkFooterWidth(isDisplaySideBar: boolean) {
    if (this.asideMenuElementWidth) {
      const footerWidth = isDisplaySideBar ? (window.innerWidth - this.asideMenuElementWidth) : window.innerWidth;
      document.getElementById('footer')
        .setAttribute('style', 'min-width: ' + (footerWidth - this.footerPadding) + 'px');
    }
  }
}
