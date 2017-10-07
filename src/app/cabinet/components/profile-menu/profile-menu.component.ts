import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/http/user.service';
import {HttpClient} from '../../../service/http.client';


@Component({
  moduleId: module.id,
  selector: 'app-cabinet-profile-menu',
  templateUrl: 'profile-menu.component.html',
  styleUrls: ['profile-menu.component.scss']
})

export class ProfileMenuComponent {
  id: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params.id;
  }
}

