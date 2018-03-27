import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';
import {LanguageService} from "../../../service/language.service";
import {SwiperComponent} from "angular2-useful-swiper";
import {event} from "d3-selection";

@Component({
  moduleId: module.id,
  selector: 'app-main-swiper-room',
  templateUrl: 'swiper-room.component.html',
  styleUrls: ['swiper-room.component.scss']
})
export class SwiperRoomComponent implements OnInit, AfterViewInit {

  rooms: RoomModel[] = [];
  pathname: string;
  locale: string = 'en';

  // object with translated words;
  // created for fixing translations async logic in slider.
  langObj: any;
  config: Object;

  @Output() swiper = new EventEmitter<{ swClass: any }>();
  @ViewChild('swiperRooms') swiperRooms: SwiperComponent;


  constructor(
    private _roomService: RoomService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.langObj  = {
      en: {
        room: 'ROOM',
        readMore: 'Read more'
      },
      pl: {
        room: 'POKÓJ',
        readMore: 'Czytaj więcej'
      }
    };
    this.languageService.getCurrentLocale().subscribe((locale: any[]) => {
      this.pathname = window.location.pathname;
      this.locale = this.pathname.split('/')[1] ? this.pathname.split('/')[1] : locale[0].$value;
    });
  }

  ngAfterViewInit() {
    this.roomsCollection().then((rooms: RoomModel[]) => {
      this.rooms = rooms;
      this.config = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loopedSlides: this.rooms.length,
        slidesPerView: 3,
        centeredSlides: true,
        speed: 1000,
        nextButton: '.swiper-area .swiper-area-next',
        prevButton: '.swiper-area .swiper-area-prev',
        loop: true,
      };

      setTimeout(() => {
        this.swiperRooms.config.effect = 'coverflow';
      });
    });
  }

  roomsCollection(): Promise<RoomModel[]> {
    return new Promise((resolve) => {
      this._roomService.allActive().subscribe((rooms: RoomModel[]) => {
        resolve(rooms);
      });
    });
  }
}
