import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AddressService } from '../address.service';
import esri = __esri;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  private _searchTerms = new Subject<string>();
  private _featureSet$: Observable<esri.FeatureSet>;

  get searchTerms(): Subject<string> {
    return this._searchTerms;
  }

  set featureSet$(featureSet: Observable<esri.FeatureSet>) {
    this._featureSet$ = featureSet;
  }

  get featureSet$(): Observable<esri.FeatureSet> {
    return this._featureSet$;
  }

  constructor(public addressService: AddressService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.featureSet$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        return this.addressService.query(`ADRHSNO=${value}`, '*', 'json', 'ADDRESS');
      })
    );
  }
}
