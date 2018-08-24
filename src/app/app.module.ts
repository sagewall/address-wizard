import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressService } from './address.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { DetailErrorComponent } from './detail-error/detail-error.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailComponent,
    MapComponent,
    HomeComponent,
    DetailErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AddressService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
