import {Component, Input, OnInit} from '@angular/core';
import {RoomModel} from '../../../../models/room.model';

@Component({
  moduleId: module.id,
  selector: 'app-main-list-rooms',
  templateUrl: 'list-rooms.component.html',
  styleUrls: ['list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {

  @Input() rooms: RoomModel[] = [];
  isMobile = false;
  sliderWrapperTopVal = 0;

  mobileWidth = {
    max: 529,
    min: 280
  };

  sliderConfig: object;

  constructor() {
  }

  ngOnInit() {
    this.keepTrackOfWindowSize();
    if (this.isMobile) {
      if (this.rooms) {
        console.log(this.rooms.length - 1);
        setTimeout(() => {
          this.sliderConfig = {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            direction: 'vertical',
            slidesPerView: 1,
            initialSlide: this.rooms.length - 1,
            loop: false,
            speed: 500,
            lazyLoading: true,
          };
        this.sliderWrapperTopVal = 308 * this.rooms.length - 308;
        }, 500);
      }
    }
  }

  keepTrackOfWindowSize() {
    if (window.innerWidth <= this.mobileWidth.max) {
      this.isMobile = true;
    }
  }
}
