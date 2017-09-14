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
  @Input() listOptions: any[];

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
    this.listOptions.forEach((list) => {
      list.checked = false;
    });
    this.findCheckedValues();
    this.isShowListOptions = !this.isShowListOptions;
  }

  updateListOptions(res: any, item: MarkingModel) {
    let indexForDeleting = 0;
    const marking: MarkingModel[] = [];

    if (res.target.checked) {
      this._listChecked.push(item);
      this._listChecked.forEach((mark: MarkingModel) => {
        if (mark.id === item.id) {
          marking.push(item);
        }
      });
    } else {
      indexForDeleting = this.findIndexForDeleting(item.id);
      this.deleteRepetativeValues(indexForDeleting);
    }

    if (marking.length > 1) {
      this.deleteRepetativeValues(this._listChecked.length - 1);
    }

    this.findCheckedValues();
    this.onChangeMarking.emit(this._listChecked);
  }

  findCheckedValues(): void {
    this.listOptions.forEach((opt: any) => {
      this._listChecked.forEach((list: MarkingModel) => {
        if (opt.id === list.id) {
          opt.checked = true;
        }
      });
    });
  }

  findIndexForDeleting(itemId: number): number {
    let returnIndex = 0;
    for (let i = 0; i < this._listChecked.length; i++) {
      if (this._listChecked[i].id === itemId) {
        returnIndex = i;
      }
    }
    return returnIndex;
  }

  deleteRepetativeValues(indexForDeleting: number): void {
    this._listChecked.splice(indexForDeleting, 1);
  }

  get isShowListOptions(): boolean {
    return this._isShowListOptions;
  }

  set isShowListOptions(isShow: boolean) {
    this._isShowListOptions = isShow;
  }
}
