import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  searchForm: FormGroup;

  private _searchTerms = new Subject<string>();
  private _featureSet$: Observable<esri.FeatureSet>;
  private _features;

  get searchControl() {
    return this.searchForm.get('searchControl');
  }

  get searchTerms(): Subject<string> {
    return this._searchTerms;
  }

  set featureSet$(featureSet: Observable<esri.FeatureSet>) {
    this._featureSet$ = featureSet;
  }

  get featureSet$(): Observable<esri.FeatureSet> {
    return this._featureSet$;
  }

  set features(features) {
    this._features = features;
  }

  get features() {
    return this._features;
  }

  constructor(public addressService: AddressService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchControl: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])
    });

    this.featureSet$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        return this.addressService.query(`ADRHSNO=${value}`, 'ADDRESS, ADNO', 'json', 'ADDRESS');
      })
    );

    this.featureSet$.subscribe(featureSet => this.features = featureSet.features);
  }
}
