import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from '../search/search.component';
import { DetailErrorComponent } from './detail-error.component';


describe('DetailErrorComponent', () => {
  let component: DetailErrorComponent;
  let fixture: ComponentFixture<DetailErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailErrorComponent,
        SearchComponent
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
