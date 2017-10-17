import { FirebaseUtils } from '../shared/firebase.utils';

export class ContactQuestionModel {
  email: string;
  message: string;

  constructor() {
    this.email = '';
    this.message = '';
  }
}
