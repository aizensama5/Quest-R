import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/http/user.service';
import {HttpClient} from '../../../service/http.client';
import {UserModel} from '../../../models/user.model';


@Component({
  moduleId: module.id,
  selector: 'app-cabinet-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
  user: UserModel[] = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private httpClient: HttpClient) {
    const getId = this.route.snapshot.params.id;
    // this.user = this.userService.getUserById(parseInt(getId, 10));
  }
}
