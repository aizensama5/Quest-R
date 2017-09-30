export class CompanySecurityModel {
  id: number;
  login: string;
  password: string;

  constructor() {
    this.id = null;
    this.login = '';
    this.password = '';
  }
}
