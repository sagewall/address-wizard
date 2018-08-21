import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Address } from '../address';
import { AddressService } from '../address.service';
import esri = __esri;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  private _featureSet$: Observable<esri.FeatureSet>;
  private _feature: esri.Graphic | Address;

  set featureSet$(featureSet: Observable<esri.FeatureSet>) {
    this._featureSet$ = featureSet;
  }

  get featureSet$(): Observable<esri.FeatureSet> {
    return this._featureSet$;
  }

  @Input()
  set feature(feature: esri.Graphic | Address) {
    this._feature = feature;
  }

  get feature(): esri.Graphic | Address {
    return this._feature;
  }

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.featureSet$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.addressService.query(`ADNO=${params.get('adno')}`, '*', 'json', 'ADNO');
      })
    );

    this.featureSet$.subscribe(featureSet => this.feature = featureSet.features[0]);
  }

}
