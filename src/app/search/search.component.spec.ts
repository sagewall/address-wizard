import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from '../detail/detail.component';
import { MapComponent } from '../map/map.component';
import { ResultsComponent } from '../results/results.component';
import { SearchComponent } from './search.component';
import { AddressService } from '../address.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let addressService: AddressService;
  let mockHttp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        ResultsComponent,
        DetailComponent,
        MapComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    addressService = new AddressService(mockHttp);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should query addresses with the correct url', () => {
    const value = 123;
    mockHttp.get.and.returnValue(of({}));
    addressService.query(`ADRHSNO=${value}`, '*', 'json', 'ADDRESS');
    // tslint:disable-next-line:max-line-length
    expect(mockHttp.get).toHaveBeenCalledWith('https://mapservices1.jeffco.us/arcgis/rest/services/AddressWizard/AddressWizard/MapServer/1/query?where=ADRHSNO%3D123&outFields=*&f=json&orderByFields=ADDRESS');

  });
});
