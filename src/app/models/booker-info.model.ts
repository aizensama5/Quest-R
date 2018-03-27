export class BookerInfoModel {
  name: string;
  phone: string;
  email: string;
  countOfPlayers: number;
  userId: string;

  constructor() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.countOfPlayers = null;
    this.userId = '';
  }
}
