import { TestBed } from '@angular/core/testing';

import { DoacoesService } from './doacoes.service';

describe('DoacoesServiceService', () => {
  let service: DoacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
