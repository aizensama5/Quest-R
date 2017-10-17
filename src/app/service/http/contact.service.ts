import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ContactQuestionModel } from '../../models/contact-question.model';
import { CompanyInfoModel } from '../../models/company-info.model';
import { TimeService } from '../time.service';

@Injectable()
export class ContactService {
  private static readonly dataBaseName = 'contact/';
  private static readonly questionObjName = 'questions/';
  private static readonly companyInfoObjName = 'company_info/';

  constructor(
    private dataBaseService: AngularFireDatabase,
    private timeService: TimeService
  ) {}

  addQuestion(question: ContactQuestionModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(ContactService.dataBaseName + ContactService.questionObjName + this.timeService.uniqueIdByTimestamp())
      .set(question);
  }

  all(): FirebaseListObservable<ContactQuestionModel[]> {
    return <FirebaseListObservable<ContactQuestionModel[]>>this.dataBaseService
      .list(ContactService.dataBaseName);
  }

  changeCompanyInfo(companyInfo: CompanyInfoModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(ContactService.dataBaseName + ContactService.companyInfoObjName)
      .set(companyInfo.toJSON());
  }

  companyInfo(): FirebaseListObservable<CompanyInfoModel[]> {
    return <FirebaseListObservable<CompanyInfoModel[]>>this.dataBaseService
      .list(ContactService.dataBaseName + ContactService.companyInfoObjName);
  }
}
