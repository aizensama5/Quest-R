import {FirebaseUtils} from '../shared/firebase.utils';
import {LanguageModel} from "./language.model";

export class GenreModel {
  id: number;
  legend: LanguageModel;
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
    this.id = null;
    this.legend = new LanguageModel();
    this.color = '';
  }
}
