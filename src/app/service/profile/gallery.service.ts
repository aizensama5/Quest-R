import { Injectable } from '@angular/core';
import { GalleryModel } from '../../models/profile/gallery.model';

@Injectable()
export class GalleryService {
  private galleryData: GalleryModel[] = [
    {
      id: 1,
      roomName: 'MIDNIGHT KILLER MK II',
      date: '2017-03-23',
      photo: [
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        }
        ]
    },
    {
      id: 2,
      roomName: 'FANTAZJA',
      date: '2017-03-23',
      photo: [
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        },
        {
          path: 'http://loremflickr.com/500/500/smile'
        }
      ]
    }
  ];

  getGalleryData(): GalleryModel[] {
    return this.galleryData;
  }

  constructor() { }

}
