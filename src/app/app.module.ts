import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddressService } from './address.service';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { MapComponent } from './map/map.component';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    DetailComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
