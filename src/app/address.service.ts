import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from './address';
import esri = __esri;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _serviceUrl = 'https://mapservices1.jeffco.us/arcgis/rest/services/AddressWizard/AddressWizard/MapServer/1';
  private _selectedFeature: esri.Graphic | Address;
  private _selectedIndex: number;

  get serviceUrl(): string {
    return this._serviceUrl;
  }

  set selectedFeature(address: esri.Graphic | Address) {
    this._selectedFeature = address;
  }

  get selectedFeature(): esri.Graphic | Address {
    return this._selectedFeature;
  }

  set selectedIndex(selectedRow: number) {
    this._selectedIndex = selectedRow;
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  constructor(private http: HttpClient) { }

  query(where: string, outFields: string, f: string, orderByFields?: string) {
    let url = `${this.serviceUrl}/query?where=${encodeURIComponent(where)}&outFields=${encodeURIComponent(outFields)}
                                          &f=${encodeURIComponent(f)}`;
    if (orderByFields) {
      url += `&orderByFields=${orderByFields}`;
    }
    return this.http.get<esri.FeatureSet>(url);
  }

  clearSelection() {
    this.selectedFeature = null;
    this.selectedIndex = null;
  }
}
