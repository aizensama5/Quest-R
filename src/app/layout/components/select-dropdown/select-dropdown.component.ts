import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-layout-select-dropdown',
    templateUrl: 'select-dropdown.component.html',
    styleUrls: ['select-dropdown.component.scss']
})
export class SelectDropdownComponent {

    @Input() placeholder: string;
    @Input() listOptions: string[];

    @Output() onChangeListOptions: EventEmitter<string[]> = new EventEmitter<string[]>();

    private _isShowListOptions = false;
    private _listChecked: string[] = [];

    constructor(
        private eRef: ElementRef
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

    updateListOptions(res: any, item: string) {
        if (res.checked) {
            this._listChecked.push(item);
        } else {
            const index: number = this._listChecked.indexOf(item);
            if (index !== -1) {
                this._listChecked.splice(index, 1);
            }
        }
        this.onChangeListOptions.emit(this._listChecked);
    }

    get isShowListOptions(): boolean {
        return this._isShowListOptions;
    }

    set isShowListOptions(isShow: boolean) {
        this._isShowListOptions = isShow;
    }
}
