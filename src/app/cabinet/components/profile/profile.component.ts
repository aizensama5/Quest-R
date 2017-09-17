import {Component} from '@angular/core';
import {AuthenticationService} from '../../../service/http/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  moduleId: module.id,
  selector: 'app-cabinet-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
  private user: Observable<firebase.User>;

  constructor(private authService: AuthenticationService) {
    this.user = authService.currentUser();
  }
}
