import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ISelectLanguage } from './select-language.interface';

@Component({
    moduleId: module.id,
    selector: 'app-layout-select-language',
    template: `
        <div class="select-language">
            <div 
                class="select-language__selected" 
                [ngClass]="{'select-language__selected--show-list': isShowList}"
                (click)="showListLanguage()"
            >
                <img 
                    class="select-language__img" 
                    [src]="selectedLang.img" 
                    alt="lang"
                >
            </div>
            <ul class="select-language__list" *ngIf="isShowList">
                <ng-container *ngFor="let lang of languageList">
                    <li
                        class="select-language__list-item" 
                        (click)="chooseLang(lang)"
                        *ngIf="isNotSelected(lang)"
                    >
                        <img
                            class="select-language__img"
                            [src]="lang.img"
                            alt="lang"
                        >
                    </li>
                </ng-container>
            </ul>
        </div>
    `,
    styleUrls: ['select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

    languageList: ISelectLanguage[] = [
        { code: 'pl', img: 'assets/images/poland.svg' },
        { code: 'en', img: 'assets/images/english.svg' },
    ];

    selectedLang: ISelectLanguage;
    isShowList = false;

    constructor(
        private eRef: ElementRef
    ) {}

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.isShowList = false;
        }
    }

    ngOnInit() {
        this.selectedLang = this.languageList[0];
    }

    chooseLang(lang: ISelectLanguage) {
        this.selectedLang = lang;
        this.isShowList = false;
    }

    showListLanguage() {
        this.isShowList = true;
    }

    isNotSelected(lang: ISelectLanguage): boolean {
        return this.selectedLang !== lang;
    }
}
