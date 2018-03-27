import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ComplexityModel} from '../../../../../models/complexity.model';

@Component({
  moduleId: module.id,
  selector: 'app-filter-complexity',
  templateUrl: 'filter-complexity.component.html',
  styleUrls: ['filter-complexity.component.scss']
})
export class FilterComplexityComponent {

  @Input() placeholder: string;
  @Input() listOptions: any[];
  @Input() filterComplexity: ComplexityModel;

  @Output() onChangeComplexity: EventEmitter<ComplexityModel> = new EventEmitter<ComplexityModel>();

  private _isShowListOptions = false;
  private _listChecked: ComplexityModel[] = [];

  constructor(private eRef: ElementRef,) {
  }

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
    if (!this.filterComplexity.id) {
      this._listChecked = [];
    } else {
      this.findCheckedValues();
    }
    this.isShowListOptions = !this.isShowListOptions;
  }

  updateListOptions(res: any, item: ComplexityModel) {
    this._listChecked.push(item);
    this.findCheckedValues();
    this.onChangeComplexity.emit(item);
  }

  findCheckedValues(): void {
    this.listOptions.forEach((opt: any) => {
      if (opt.id === this._listChecked[this._listChecked.length - 1].id) {
        opt.checked = true;
      }
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
