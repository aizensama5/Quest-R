import { FirebaseUtils } from '../shared/firebase.utils';
import {LanguageModel} from "./language.model";

export class CompanyInfoModel {
  email: string;
  phone: string;
  address: LanguageModel;

  static fromJSON(values) {
    const companyInfo = new CompanyInfoModel();

    for (const value in values) {
      if (companyInfo.hasOwnProperty(value)) {
        companyInfo[value] = values[value];
      }
    }
    return companyInfo;
  }

  static fromJsonArray(json: any[]): CompanyInfoModel[] {
    return json.map(CompanyInfoModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.email = '';
    this.phone = '';
    this.address = new LanguageModel();
  }
}
