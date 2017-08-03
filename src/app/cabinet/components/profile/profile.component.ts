import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  user: UserModel;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private httpClient: HttpClient) {
    let getId = this.route.snapshot.params.id;
    getId = parseInt(getId, 10);
    this.user = this.userService.getUserById(getId);

    // this.httpClient.get('/api/authenticate', {
    //   param1: 'sad'
    // }).subscribe((response: any) => {
    //   console.log(response);
    // });
  }
}
