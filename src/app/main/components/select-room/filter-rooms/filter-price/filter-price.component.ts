import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-filter-price',
  templateUrl: 'filter-price.component.html',
  styleUrls: ['filter-price.component.scss']
})
export class FilterPriceComponent implements OnInit {

  @Input() roundCircleParams: any;

  @Input() initValue = 0;

  stepMarkValue = 10;

  minPrice = 0;
  maxPrice = 100;

  @Output() onChangePrice: EventEmitter<number> = new EventEmitter<number>();

  step = 360 / this.maxPrice;

  @ViewChild('inputPrice') input: ElementRef;

  private _value: number = 0;
  private _valueFixed: number = 0;

  set value(value: number) {
    this.checkValue(value);
    setTimeout(() => {
      this.input.nativeElement.value = this._value;
    });
  }

  @Input()
  get value(): number {
    return +this._value;
  }

  set valueOnFixedPos(value: number) {
    this.checkValue(value);
    setTimeout(() => {
      this._valueFixed = this._value;
      this.onChangePrice.emit(this._valueFixed);
    });
  }

  get valueOnFixedPos(): number {
    return +this._valueFixed;
  }

  checkValue (value: number): void {
    if (value > this.maxPrice) {
      this._value = this.maxPrice;
    } else if (value < this.minPrice) {
      this._value = this.minPrice;
    } else {
      this._value = value;
    }
  }

  constructor(
  ) {
    setTimeout(() => {
      this._value = this.initValue;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this._value = this.initValue;
    });
  }
}
