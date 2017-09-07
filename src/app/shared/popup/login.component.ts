import {Component, Injectable, Input} from '@angular/core';
import { PopupNotificationService } from '../../service/popup.notification.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent {
  constructor(popupNotificationService: PopupNotificationService) {
    popupNotificationService.showPopup$.next('Hello!');
  }
}
