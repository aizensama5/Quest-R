import {Component, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/http/user.service';
import {HttpClient} from '../../../service/http.client';
import {UserModel} from '../../../models/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-cabinet-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class CabinetMainComponent {

}
