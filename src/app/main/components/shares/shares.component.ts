import { Component, Input, OnInit } from '@angular/core';
import { SharesModel } from '../../../models/shares.model';
import { SharesService } from '../../../service/http/shares.service';

@Component({
    moduleId: module.id,
    selector: 'app-main-shares',
    templateUrl: 'shares.component.html',
    styleUrls: ['shares.component.scss']
})
export class SharesComponent implements OnInit {

    @Input() shares: SharesModel[] = [];

    config: Object = {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 20,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // Enable lazy loading
        lazyLoading: true
    };

    constructor(
        private _sharesService: SharesService
    ) {}

    ngOnInit() {
        this.getAllShares();
    }

    getAllShares() {
        this._sharesService.all().subscribe((shares: SharesModel[]) => {
           this.shares = shares;
        });
    }
}
