import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from "../service/http/user.service";

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  constructor(public userService: UserService) {
  }

  transform(value: any, args?: any): any {
    return null;
  }

  getUserNameByUserId() {
  }

}
