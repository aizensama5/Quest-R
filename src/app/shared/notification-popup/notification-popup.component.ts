import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit {
  @Input() isShowNotificationPopup: boolean;
  @Input() areErrors: boolean;
  @Input() notificationPopupMessage: boolean;
  @Input() isShowConfirmButton: boolean = false;
  @Output() onClosePopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onConfirmEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
  }

  closePopup() {
    this.onClosePopup.emit(true);
  }

  confirm() {
    this.onConfirmEvent.emit(true);
  }

}
