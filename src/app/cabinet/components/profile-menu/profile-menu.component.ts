import {Component, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/http/user.service';
import {HttpClient} from '../../../service/http.client';
import {UserModel} from '../../../models/user.model';


@Component ({
  moduleId: module.id,
  selector: 'app-cabinet-profile-menu',
  templateUrl: 'profile-menu.component.html',
  styleUrls: ['profile-menu.component.scss']
})

export class ProfileMenuComponent {
  user: UserModel;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private route: Router,
              private userService: UserService,
              private httpClient: HttpClient) {
    this.id = this.activatedRoute.snapshot.params.id;
    // getId = parseInt(getId, 10);
    // this.user = this.userService.getUserById(getId);

  }

  isActive(router) {
    return this.route.serializeUrl(this.route.parseUrl(this.route.url)) == this.route.serializeUrl((this.route.createUrlTree([router])));
  }
}
