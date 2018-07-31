import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../address';
import esri = __esri;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  private _feature: esri.Graphic | Address;

  @Input()
  set feature(feature: esri.Graphic | Address) {
    this._feature = feature;
  }

  get feature(): esri.Graphic | Address {
    return this._feature;
  }

  constructor() { }

  ngOnInit() {
  }

}
