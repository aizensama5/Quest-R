import { FirebaseUtils } from '../shared/firebase.utils';
import { LanguageModel } from "./language.model";

export class ComplexityModel {
  id: number;
  complexity: LanguageModel;

  static fromJSON(values) {
    const complexity = new ComplexityModel();

    for (const value in values) {
      if (complexity.hasOwnProperty(value)) {
        complexity[value] = values[value];
      }
    }
    return complexity;
  }

  static fromJsonArray(json: any[]): ComplexityModel[] {
    return json.map(ComplexityModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.complexity = new LanguageModel();
  }
}
