import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as d3 from 'd3';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GenreModel } from '../../../models/genre.model';


@Component({
  moduleId: module.id,
  selector: 'app-layout-round-slider-gender',
  templateUrl: 'round-slider-gender.component.html',
  styleUrls: ['round-slider-gender.component.scss'],
  animations: [
    trigger('circleAnimation',
      [
        state('start', style({
          transform: 'rotate(0deg)'
        })),
        state('finish', style({
          transform: 'rotate(360deg)'
        })),
        transition('start => finish', animate('1s ease-in'))
      ]),
  ]
})
export class RoundSliderGenderComponent implements OnInit {

  @Input() width = 120;
  @Input() height = 120;
  @Input() radius = 45;
  @Input() thick = 5;

  @Input()
  set genres(genres: any[]) {
    this._genres = genres.map(item => Object.assign({}, item, {value: 1}));

    const arr = this.divideArray(this._genres);
    this.leftArr = arr.left;
    this.rightArr = arr.right;
  }

  get genres(): any[] {
    return this._genres;
  }


  @Output() selectedGender: EventEmitter<GenreModel> = new EventEmitter<GenreModel>();


  container: any;

  leftArr = [];
  rightArr = [];
  _genres: any[];
  state = 'start';

  constructor() {
  }

  ngOnInit() {
    const host = d3.selectAll('.round-slider-genre__container');

    const svg = host.append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'container')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');


    this.container = svg.append('g');

    const arc = d3.arc()
      .innerRadius(this.radius - (this.thick / 2))
      .outerRadius(this.radius + (this.thick / 2));

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const g = svg.selectAll('.fan')
      .data(pie(this.genres))
      .enter()
      .append('g')
      .attr('class', 'fan')
      .on('click', (d: any) => {
        this.selectedCircle(d.data);
      });

    // this.drawFilterPie();

    g.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color);
  }

  selectedCircle(genre: GenreModel) {
    this.selectedGender.emit(genre);
    this.state = 'finish';
  }

  private drawFilterPie() {
    const defs = this.container.append('defs'),
      filter = defs.append('filter')
        .attr('id', 'dropshadow');

    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 9)
      .attr('result', 'blur');
    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetBlur');

    filter.append('feFlood')
      .attr('in', 'offsetBlur')
      .attr('flood-color', '#ffffff')
      .attr('flood-opacity', '0.66')
      .attr('result', 'offsetColor');

    filter.append('feComposite')
      .attr('in', 'offsetColor')
      .attr('in2', 'offsetBlur')
      .attr('operator', 'in')
      .attr('result', 'offsetBlur');

    const feMerge = filter.append('feMerge');

    feMerge.append('feMergeNode')
      .attr('in', 'offsetBlur');

    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');
  }

  private divideArray(arr: any[]): { left: any[], right: any[] } {
    const mid = Math.ceil(arr.length / 2);
    return {
      left: arr.slice(0, mid),
      right: arr.slice(mid)
    };
  }

  animationDone () {
    this.state = 'start';
  }

  animationStart () {
    this.state = 'finish';
  }

}
