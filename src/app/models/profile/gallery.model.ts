import {PhotoModel} from './photo.model';

export class GalleryModel {
  id: number;
  roomName: string;
  date: string;
  photo: PhotoModel[];
}
