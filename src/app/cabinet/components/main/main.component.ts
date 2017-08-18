import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-cabinet-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class CabinetMainComponent implements OnInit {
  constructor(private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log('cabinet');
  }
}
