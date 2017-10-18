import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {GalleryModel} from '../../models/profile/gallery.model';

@Injectable()
export class GalleryService {

  private static readonly dataBaseName = 'gallery/';

  constructor(private dataBaseService: AngularFireDatabase) {}

  addPhoto(photo: GalleryModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(GalleryService.dataBaseName + photo.userId)
      .set(photo.toJSON());
  }

  all(): FirebaseListObservable<GalleryModel[]> {
    return <FirebaseListObservable<GalleryModel[]>>this.dataBaseService
      .list(GalleryService.dataBaseName);
  }

  userGallery(userId: string): FirebaseListObservable<GalleryModel[]> {
    return <FirebaseListObservable<GalleryModel[]>>this.dataBaseService
      .list(GalleryService.dataBaseName + userId)
      .map((items) => items.map(GalleryModel.fromJSON));
  }

  roomGallery(roomId: number, gallery?: GalleryModel[]) {
    let allPhotos: GalleryModel[] = [];
    if (gallery.length) {
      allPhotos = gallery;
    } else {
      this.all().subscribe((gal: GalleryModel[]) => {
        allPhotos = gal;
      });
    }
    return allPhotos.filter((gal: GalleryModel) => gal.roomId === roomId)[0];
  }

}
