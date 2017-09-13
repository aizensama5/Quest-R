import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ComplexityModel } from '../../../../../models/complexity.model';

@Component({
  moduleId: module.id,
  selector: 'app-filter-complexity',
  templateUrl: 'filter-complexity.component.html',
  styleUrls: ['filter-complexity.component.scss']
})
export class FilterComplexityComponent {

  @Input() placeholder: string;
  @Input() listOptions: ComplexityModel[];

  @Output() onChangeComplexity: EventEmitter<ComplexityModel> = new EventEmitter<ComplexityModel>();

  private _isShowListOptions = false;
  private _listChecked: ComplexityModel;

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

  updateListOptions(res: any, item: ComplexityModel) {
    this._listChecked = item;
    this.onChangeComplexity.emit(this._listChecked);
  }

  get isShowListOptions(): boolean {
    return this._isShowListOptions;
  }

  set isShowListOptions(isShow: boolean) {
    this._isShowListOptions = isShow;
  }
}
