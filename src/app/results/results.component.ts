import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../address';
import { AddressService } from '../address.service';
import esri = __esri;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {

  private _features: esri.Graphic[] | Address[];

  @Input()
  set features(features: esri.Graphic[] | Address[]) {
    this._features = features;
  }

  get features(): esri.Graphic[] | Address[] {
    return this._features;
  }

  constructor(private addressService: AddressService) { }

  ngOnInit() {
  }

  selectFeature(feature: Address, index: number) {
    this.addressService.selectedFeature = feature;
    this.addressService.selectedIndex = index;
  }

}
