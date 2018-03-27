import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../service/http/room.service";
import {RoomModel} from "../../../models/room.model";
import {LoaderService} from "../../../service/loader.service";

@Component({
  moduleId: module.id,
  selector: 'app-room',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})

export class RoomMainComponent implements OnInit {
  target = 'toolbar';
  isRoomExist = false;
  isMobile = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private roomService: RoomService,
              public loaderService: LoaderService
  ) {
    this.loaderService.show();
  }

  ngOnInit() {
    if (window.innerWidth <= 529) {
      this.isMobile = true;
    }
    this.activatedRoute.data.subscribe((data) => {
      if (data && data['room']) {
        let index = 0;
        data['room'].forEach((room: RoomModel) => {
          if (+this.activatedRoute.snapshot.params.id === room.id) {
            this.isRoomExist = true;
          }
          index++
        });
        if (!this.isRoomExist) {
          this.router.navigate(['**']);
        }
      }
    });
    if (document.getElementById(this.target)) {
      document.getElementById(this.target).scrollIntoView({
        block: 'start'
      });
    }
    this.loaderService.hide(2000);
  }
}
