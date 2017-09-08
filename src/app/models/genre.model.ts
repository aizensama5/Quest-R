import {FirebaseUtils} from '../shared/firebase.utils';

export class GenreModel {
  id: number;
  legend: string;
  color: string;

  static fromJSON(values) {
    const genre = new GenreModel();

    for (const value in values) {
      if (genre.hasOwnProperty(value)) {
        genre[value] = values[value];
      }
    }
    return genre;
  }

  static fromJsonArray(json: any[]): GenreModel[] {
    return json.map(GenreModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor () {
    this.id = 1;
    this.legend = '';
    this.color = '';
  }
}
