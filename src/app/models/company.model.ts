import { FirebaseUtils } from '../shared/firebase.utils';

export class CompanyModel {
  id: number;
  companyName: string;
  logo: string;
  aboutCompany: string;
  facebookFanpage: string;
  languageMails: number;
  websiteAddress: string;

  static fromJSON(values) {
    const company = new CompanyModel();

    for (const value in values) {
      if (company.hasOwnProperty(value)) {
        company[value] = values[value];
      }
    }
    return company;
  }

  static fromJsonArray(json: any[]): CompanyModel[] {
    return json.map(CompanyModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.companyName = '';
    this.logo = '';
    this.aboutCompany = '';
    this.facebookFanpage = '';
    this.languageMails = null;
    this.websiteAddress = '';
  }
}
