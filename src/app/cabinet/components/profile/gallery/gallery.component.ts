import { Component } from '@angular/core';
import { GalleryService } from '../../../../service/profile/gallery.service';
import { GalleryModel } from '../../../../models/profile/gallery.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  sliderConfig: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 4,
    centeredSlides: true,
    loop: false,
    speed: 1000,
    lazyLoading: true
  };

  galleryData: GalleryModel[];

  constructor( galleryService: GalleryService ) {
    galleryService.all().subscribe((galData) => {
      this.galleryData = galData;
    });
  }

}