import {Component, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';
import { GalleryService } from '../../../../service/profile/gallery.service';
import { GalleryModel } from '../../../../models/profile/gallery.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  galleryData: GalleryModel[];
  @Output() swiper = new EventEmitter<{swClass: any }>();
  @ViewChild('swiperClass') swiperClass: ElementRef;

  sliderConfig: Object = {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 5,
    centeredSlides: true,
    loop: false,
    speed: 1000,
    lazyLoading: true,

  };

  slidePrev() {

  }

  slideNext() {
    this.swiper.emit({
      swClass: this.swiperClass.nativeElement
    });
    console.log(this.swiper);
    console.log(this.swiperClass);
  }


  constructor( galleryService: GalleryService ) {
    galleryService.all().subscribe((galData) => {
      this.galleryData = galData;
    });
  }

}
