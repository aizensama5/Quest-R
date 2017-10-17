import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class AdminMainComponent implements OnInit, OnDestroy {
  is_displaySideBar = true;

  constructor() {}

  ngOnInit() {
    document.getElementById('admin-main-container')
      .setAttribute('style', 'min-height: ' + this.containerHeight() + 'px');
    document.body.style.backgroundColor = '#ECF0F5';
    document.body.style.backgroundImage = 'none';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundImage = 'linear-gradient(214deg, #000000, #2a2c2e 54%, #131313);';
  }

  onSideBarToggle (is_display: boolean) {
    this.is_displaySideBar = is_display;
  }

  containerHeight(): number {
    const header: HTMLElement = document.getElementById('header');
    const footer: HTMLElement = document.getElementById('footer');
    return window.innerHeight - header.offsetHeight - footer.offsetHeight;
  }

}
