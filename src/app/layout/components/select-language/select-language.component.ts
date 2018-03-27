import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ISelectLanguage} from './select-language.interface';
import {Router} from "@angular/router";
import {LanguageService} from "../../../service/language.service";

@Component({
  moduleId: module.id,
  selector: 'app-layout-select-language',
  template: `
    <div class="select-language" *ngIf="selectedLang">
      <div
        class="select-language__selected"
        [ngClass]="{'select-language__selected--show-list': isShowList}"
        (click)="showListLanguage()"
      >
        <img
          class="select-language__img"
          [src]="selectedLang?.img"
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
              [src]="lang?.img"
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
    {code: 'en', img: 'assets/images/english.svg'},
    {code: 'pl', img: 'assets/images/poland.svg'},
  ];

  selectedLang: ISelectLanguage;
  isShowList = false;

  constructor(
    private eRef: ElementRef,
    public router: Router,
    public languageService: LanguageService
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isShowList = false;
    }
  }

  ngOnInit() {
    this.getCurrentLang();
  }

  getCurrentLang() {
    const locale = window.location.pathname.split('/')[1];
    switch(locale) {
      case 'en':
        this.selectedLang = this.languageList[0];
        break;
      case 'pl':
        this.selectedLang = this.languageList[1];
        break;
      default:
        this.languageService.getCurrentLocale().subscribe((curLoc: any) => {
          this.selectedLang = {
            code: curLoc[0].$value,
            img: curLoc[0].$value === 'en' ? this.languageList[0].img : this.languageList[1].img
          };
        });
    }
  }

  chooseLang(lang: ISelectLanguage) {
    let currentURL = this.router.url;
    currentURL = currentURL === '/en' || currentURL === '/pl' ? currentURL + '/' : '';
    const replacedUrl = currentURL.split('/');
    if (currentURL.indexOf('/en/') !== -1 || currentURL.indexOf('/pl/') !== -1) {
      replacedUrl.splice(1, 1, lang.code);
    } else {
      replacedUrl.splice(1, 0, lang.code);
    }
    this.router.navigate(['/' + replacedUrl.join('/') + '/']);
    this.selectedLang = lang;
    this.isShowList = false;
  }

  showListLanguage() {
    this.isShowList = true;
  }

  isNotSelected(lang: ISelectLanguage): boolean {
    return this.selectedLang.code !== lang.code;
  }
}
