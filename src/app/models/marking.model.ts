import { FirebaseUtils } from '../shared/firebase.utils';
import { LanguageModel } from "./language.model";

export class MarkingModel {
  id: number;
  marking: LanguageModel;
  checked?: boolean;

  static fromJSON(values) {
    const complexity = new MarkingModel();

    for (const value in values) {
      if (complexity.hasOwnProperty(value)) {
        complexity[value] = values[value];
      }
    }
    return complexity;
  }

  static fromJsonArray(json: any[]): MarkingModel[] {
    return json.map(MarkingModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.marking = new LanguageModel();
  }
}
