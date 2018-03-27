import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-gallery-slider',
  templateUrl: './gallery-slider.component.html',
  styleUrls: ['./gallery-slider.component.scss']
})
export class GallerySliderComponent implements OnInit, AfterViewInit {
  @Input() galleryData: any[];
  @Input() startSlide: number = 0;
  @Output() onGalleryClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  sliderConfig: object;

  constructor() {}

  ngOnInit() {
    this.sliderConfig = {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 1,
      initialSlide: this.startSlide,
      centeredSlides: true,
      loop: false,
      speed: 1000
    };
  }

  ngAfterViewInit() {}



  closeGallerySlider() {
    this.onGalleryClose.emit(false);
  }

}
