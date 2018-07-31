import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';
import { AddressService } from './address.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent,
        ResultsComponent,
        DetailComponent
      ],
      providers: [
        AddressService
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'address-wizard'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('address-wizard');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to address-wizard!');
  }));
});
