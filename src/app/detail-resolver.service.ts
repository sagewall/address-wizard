import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AddressService } from './address.service';
import esri = __esri;

@Injectable({
  providedIn: 'root'
})
export class DetailResolverService implements Resolve<esri.Graphic> {

  constructor(private addressService: AddressService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<esri.Graphic> {
    const adno = route.paramMap.get('adno');

    return this.addressService.query(`ADNO=${adno}`, '*', 'json', 'ADNO').pipe(
      take(1),
      map(featureSet => {
        if (featureSet.features && featureSet.features.length === 1) {
          return featureSet.features[0];
        } else {
          this.router.navigate(['/address/search']);
          return null;
        }
      })
    );
  }
}
