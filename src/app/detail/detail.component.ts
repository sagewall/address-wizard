import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../address';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  private _address: Address;

  set address(feature: Address) {
    this._address = feature;
  }

  get address(): Address {
    return this._address;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { address: Address }) => {
      this.address = data.address;
    });
  }
}
