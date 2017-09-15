import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-filter-players',
  templateUrl: 'filter-players.component.html',
  styleUrls: ['filter-players.component.scss']
})
export class FilterPlayersComponent implements OnInit {

  minCountPlayers = 0;
  maxCountPlayers = 8;

  @Output() onChangeCountPlayers: EventEmitter<number> = new EventEmitter<number>();

  step = 360 / this.maxCountPlayers;

  @ViewChild('inputPlayers') input: ElementRef;
  @Input() initValue = 0;

  private _value = 0;
  private _valueFixed = 0;

  set value(value: number) {
    this.checkValue(value);
    setTimeout(() => {
      this.input.nativeElement.value = this._value;
    });
  }

  @Input()
  get value(): number {
    return this._value;
  }

  set valueOnFixedPos(value: number) {
    this.checkValue(value);
    setTimeout(() => {
      this._valueFixed = this._value;
      this.onChangeCountPlayers.emit(this._valueFixed);
    });
  }

  get valueOnFixedPos(): number {
    return this._valueFixed;
  }

  checkValue (value: number): void {
    if (value > this.maxCountPlayers) {
      this._value = this.maxCountPlayers;
    } else if (value < this.minCountPlayers) {
      this._value = this.minCountPlayers;
    } else {
      this._value = value;
    }
  }

  constructor(
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this._value = this.initValue;
    });
  }
}
