import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoomModel } from '../../models/room.model';

@Injectable()
export class FavoritesService {
  private favoritesRoom: RoomModel[] = [];

  /**
   * Get all user's favorites.
   * @returns <Observable<FavoritesModel[]>>
   */
  all(): Observable<RoomModel[]> {
    return Observable.of(this.favoritesRoom);
  }

  constructor() { }

}
