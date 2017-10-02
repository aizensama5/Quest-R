import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as d3 from 'd3';

@Component({
  moduleId: module.id,
  selector: 'app-layout-round-slider',
  templateUrl: 'round-slider.component.html',
  styleUrls: ['round-slider.component.scss']
})
export class RoundSliderComponent implements OnInit {

  @Input() width = 120;
  @Input() height = 120;
  @Input() radius = 45;
  @Input() thick = 5;

  @Input() max: number;
  @Input() min: number;

  @Input() step: number;
  @Input() stepMarkValue = 0;


  private _value = 0;
  private _valueFixed = 0;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() valueFixedChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this.valueChange.emit(value);
    this._value = value || 0;
    if (this.dot) {
      const crossCoord = this.getCoordByAngle(this.gradToRad(this._value * (this.step)));
      this.moveDotToPosition(crossCoord.x, crossCoord.y, this.dot.node());
    }
  }

  @Input()
  get valueFixed(): number {
    return this._valueFixed;
  }

  set valueFixed(value: number) {
    this.valueFixedChange.emit(value);
    this._valueFixed = value || 0;
  }

  arcForeground: any;
  container: any;
  arc: any;
  dot: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {

    const host = d3.selectAll('.round-slider-container');

    const drag = d3.drag()
      .on('drag', this.dragged(this))
      .on('end', this.dragEnd(this));

    const svg = host.append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

    this.container = svg.append('g');

    this.container.append('circle')
      .attr('r', this.width / 2)
      .attr('class', 'circumference');

    this.drawLinearGradient();

    this.arc = d3.arc()
      .innerRadius(this.radius - (this.thick / 2))
      .outerRadius(this.radius + (this.thick / 2))
      .startAngle(0);

    this.arcForeground = this.container.append('path')
      .datum({endAngle: 0})
      .attr('class', 'arc')
      .attr('d', this.arc);

    this.container.append('circle')
      .attr('class', 'border-radius')
      .attr('r', this.radius);

    this.drawCircleScale();

    this.dot = this.container.append('g')
      .attr('class', 'dot')
      .selectAll('circle')
      .data([{
        x: 0,
        y: -this.radius
      }])
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('cx', 0)
      .attr('cy', -this.radius)
      .call(drag);
  }

  private drawCircleScale() {
    for (let i = 0, index = 0; i <= 360; i += this.step, index++) {
      const angle = this.getCoordByAngle(this.gradToRad(i));
      if (!this.stepMarkValue || (this.stepMarkValue && !(index % this.stepMarkValue))) {
        this.container
          .append('g')
          .attr('transform', () => 'translate(' + (angle.x) + ', ' + angle.y + ')')
          .append('line')
          .attr('x1', 0)
          .attr('y1', -10)
          .attr('x2', 0)
          .attr('y2', +10)
          .attr('transform', () => 'rotate(' + i + ')')
          .attr('class', 'line');
      }
    }
  }

  private getCoordByAngle(angle: number) {

    if (angle <= Math.PI / 2) {
      return {
        x: Math.sin(angle) * this.radius,
        y: -Math.cos(angle) * this.radius
      };
    } else if (angle > (Math.PI / 2) && angle <= Math.PI) {
      return {
        y: Math.sin(angle - Math.PI / 2) * this.radius,
        x: Math.cos(angle - Math.PI / 2) * this.radius
      };
    } else if (angle > Math.PI && angle <= (3 * Math.PI / 2)) {
      return {
        x: -Math.sin(angle - Math.PI) * this.radius,
        y: Math.cos(angle - Math.PI) * this.radius
      };
    } else if (angle > (3 * Math.PI / 2) && angle <= (2 * Math.PI)) {
      return {
        y: -Math.sin(angle - (3 * Math.PI / 2)) * this.radius,
        x: -Math.cos(angle - (3 * Math.PI / 2)) * this.radius
      };
    } else {
      throw new Error('Can not be reached');
    }
  }

  private dragEnd(instance: any) {
    return function () {
      const coord = d3.mouse(this);
      const rad = instance.getAngleByPosition(coord[0], coord[1]);
      const foundAngleGradObject = instance.getNearestAngle(instance.radToGrad(rad));
      const crossCoord = instance.getCoordByAngle(instance.gradToRad(foundAngleGradObject.angle));
      instance.moveDotToPosition(crossCoord.x, crossCoord.y, this);

      instance.value = foundAngleGradObject.index;

      instance.valueFixed = instance.value;
    };
  }

  private getNearestAngle(angleGrad: number): { angle: number, index: number } {
    let min = 360;
    let currentAngle = 0;
    let currentIndex = 0;

    for (let i = 0, index = 0; i <= 360; i += this.step, index++) {
      const diff = Math.abs(angleGrad - i);
      if (diff < min) {
        min = diff;
        currentAngle = i;
        currentIndex = index;
      }
    }
    return {angle: currentAngle, index: currentIndex};
  }

  private dragged(instance: any) {
    return function () {
      const coord = d3.mouse(this);

      const rad = instance.getAngleByPosition(coord[0], coord[1]);
      const foundAngleGradObject = instance.getNearestAngle(instance.radToGrad(rad));

      instance.value = foundAngleGradObject.index;

      instance.moveDotToPosition(coord[0], coord[1], this);
    };
  }

  private moveDotToPosition(x, y, element) {
    const circleCoord = this.getCoordForFixedRadius(this.radius, x, y);

    d3.select(element)
      .attr('cx', circleCoord.x)
      .attr('cy', circleCoord.y);

    const rad = this.getAngleByPosition(x, y);
    this.arcForeground.attr('d', this.arc({endAngle: rad}));
  }

  private getCoordForFixedRadius(radius: number, x: number, y: number) {
    const dFromOrigin = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const alpha = Math.acos(x / dFromOrigin);
    return {
      x: radius * Math.cos(alpha),
      y: y < 0 ? -radius * Math.sin(alpha) : radius * Math.sin(alpha)
    };
  }

  private drawLinearGradient() {
    const gradient = this.container.append('linearGradient')
      .attr('id', 'mainGradient');

    gradient.append('stop')
      .attr('class', 'stop-left')
      .attr('offset', '0');

    gradient.append('stop')
      .attr('class', 'stop-right')
      .attr('offset', '1');
  }

  private getAngleByPosition(x: number, y: number) {

    const xAbs = Math.abs(x);
    const yAbs = Math.abs(y);
    const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    if (x >= 0 && y <= 0) {
      return Math.asin(xAbs / r);
    } else if (x >= 0 && y >= 0) {
      return (Math.PI / 2) + Math.asin(yAbs / r);
    } else if (x < 0 && y >= 0) {
      return (Math.PI) + Math.asin(xAbs / r);
    } else if (x < 0 && y <= 0) {
      return (Math.PI + (Math.PI / 2)) + Math.asin(yAbs / r);
    } else {
      throw new Error('Can not be reached');
    }
  }

  private radToGrad(rad: number) {
    return (rad) * 180 / Math.PI;
  }

  private gradToRad(grad: number) {
    return (grad) * Math.PI / 180;
  }
}

