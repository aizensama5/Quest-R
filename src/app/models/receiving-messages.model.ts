export class ReceivingMessagesModel {
  infoAboutNewReviews: boolean;
  emailAddresses: string;

  constructor() {
    this.infoAboutNewReviews = true;
    this.emailAddresses = '';
  }
}
