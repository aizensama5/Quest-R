import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CompanyModel } from '../../models/company.model';

@Injectable()
export class CompanyService {
  private static readonly dataBaseName = 'company/';

  constructor(
    private dataBaseService: AngularFireDatabase
  ) {}

  addCompany(companyData: CompanyModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(CompanyService.dataBaseName + companyData.id)
      .set(companyData);
  }

  all(): FirebaseListObservable<CompanyModel[]> {
    return <FirebaseListObservable<CompanyModel[]>>this.dataBaseService
      .list(CompanyService.dataBaseName);
  }

  changeCompanyData(companyData: CompanyModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(CompanyService.dataBaseName + companyData.id)
      .set(companyData);
  }

  companyData(companyId: number): FirebaseListObservable<CompanyModel[]> {
    return <FirebaseListObservable<CompanyModel[]>>this.dataBaseService
      .list(CompanyService.dataBaseName, {
        query: {
          orderByChild: 'id',
          equalTo: companyId
        }
      });
  }
}
