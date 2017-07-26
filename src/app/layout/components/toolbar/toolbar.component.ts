import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-layout-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    private links: string[] = [
        'Квесты',
        'Как играть',
        'Акции',
        'Отзывы',
        'Контакты'
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
