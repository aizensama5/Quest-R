import { Injectable } from '@angular/core';
import { GenreModel } from '../models/genre.model';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class GenreService {
  private static readonly dataBaseName = 'genre/';

  constructor(private databaseService: AngularFireDatabase) {}

  addGenre(genre: GenreModel): Promise<void> {
    return <Promise<void>>this.databaseService.object(GenreService.dataBaseName + genre.id).set(genre.toJSON());
  }

  all(): FirebaseListObservable<GenreModel[]> {
    return <FirebaseListObservable<GenreModel[]>>this.databaseService
      .list(GenreService.dataBaseName)
      .map((items) => items.map(GenreModel.fromJSON));
  }
}
