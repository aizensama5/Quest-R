import { FirebaseUtils } from '../shared/firebase.utils';

export class CompanyInfoModel {
  email: string;
  phone: string;
  address: string;

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
    this.address = '';
  }
}
