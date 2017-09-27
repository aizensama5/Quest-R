import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class AdminMainComponent implements OnInit, OnDestroy {
  is_displaySideBar = true;

  constructor() {
    console.log(this.is_displaySideBar);
  }

  ngOnInit() {
    console.log(window.innerHeight);
    document.body.style.minHeight = window.innerHeight + 'px';
    document.body.style.backgroundColor = '#d2d6de';
    document.body.style.backgroundImage = 'none';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundImage = 'linear-gradient(214deg, #000000, #2a2c2e 54%, #131313);';
  }

  onSideBarToggle (is_display: boolean) {
    this.is_displaySideBar = is_display;
  }

}
