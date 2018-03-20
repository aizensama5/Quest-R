import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../../../service/http/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {LoaderService} from "../../../service/loader.service";

@Component({
  moduleId: module.id,
  selector: 'app-cabinet-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class CabinetMainComponent implements OnInit {
  user: Observable<firebase.User>;
  constructor (
    private authService: AuthenticationService,
    public loaderService: LoaderService
  ) {
    this.user = authService.currentUser();
    this.loaderService.show();
  }

  ngOnInit() {
    this.loaderService.hide(1500);
  }
}
