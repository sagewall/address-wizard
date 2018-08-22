import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailResolverService } from './detail-resolver.service';

describe('DetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailResolverService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([DetailResolverService], (service: DetailResolverService) => {
    expect(service).toBeTruthy();
  }));
});
