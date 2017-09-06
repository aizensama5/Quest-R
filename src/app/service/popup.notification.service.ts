import { Subject } from 'rxjs/Subject';

export class PopupNotificationService {
  showPopup$: Subject<string> = new Subject<string>();
}
