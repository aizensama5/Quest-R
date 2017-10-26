import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { CompanySecurityModel } from '../../models/company-security.model';

@Injectable()
export class CompanySecurityService {
  private static readonly dataBaseName = 'company-security/';

  constructor(private dataBaseService: AngularFireDatabase) { }

  all(): FirebaseListObservable<CompanySecurityModel[]> {
    return <FirebaseListObservable<CompanySecurityModel[]>>this.dataBaseService
      .list(CompanySecurityService.dataBaseName);
  }

  changePassword(companyData: CompanySecurityModel, password?: string): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(CompanySecurityService.dataBaseName + companyData.id)
      .set(companyData);
  }

}
