import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from "../service/http/user.service";
import { UserModel } from "../models/user.model";

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  constructor(public userService: UserService) {}

  transform(userId: string): string {
    return this.getUserNameByUserId(userId).name;
  }

  getUserNameByUserId(userId: string): UserModel {
    let user: UserModel = new UserModel();
    this.userService.all().subscribe((users: UserModel[]) => {
      user = this.userService.userById(userId, users);
    });
    return user;
  }

}
