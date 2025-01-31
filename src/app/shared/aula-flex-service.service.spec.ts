import { TestBed } from '@angular/core/testing';

import { AulaFlexServiceService } from './aula-flex-service.service';

describe('AulaFlexServiceService', () => {
  let service: AulaFlexServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AulaFlexServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
