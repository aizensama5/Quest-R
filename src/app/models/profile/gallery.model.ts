import {PhotoModel} from './photo.model';

export interface GalleryModel {
  id: number;
  roomName: string;
  date: string;
  photo: PhotoModel[];
}
