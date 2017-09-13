import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MarkingModel } from '../../../../../models/marking.model';

@Component({
  moduleId: module.id,
  selector: 'app-filter-marking',
  templateUrl: 'filter-marking.component.html',
  styleUrls: ['filter-marking.component.scss']
})
export class FilterMarkingComponent {

  @Input() placeholder: string;
  @Input() listOptions: MarkingModel[];

  @Output() onChangeMarking: EventEmitter<MarkingModel[]> = new EventEmitter<MarkingModel[]>();

  private _isShowListOptions = false;
  private _listChecked: MarkingModel[] = [];

  constructor(
    private eRef: ElementRef,
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target) && this.isShowListOptions) {
      this.isShowListOptions = false;
    }
  }

  toggleListOptions() {
    this.isShowListOptions = !this.isShowListOptions;
  }

  updateListOptions(res: any, item: MarkingModel) {
    this._listChecked.forEach((mark: MarkingModel) => {
      if (mark.id === item.id) {
        return false;
      }
    });
    this._listChecked.push(item);
    this.onChangeMarking.emit(this._listChecked);
  }

  get isShowListOptions(): boolean {
    return this._isShowListOptions;
  }

  set isShowListOptions(isShow: boolean) {
    this._isShowListOptions = isShow;
  }
}
