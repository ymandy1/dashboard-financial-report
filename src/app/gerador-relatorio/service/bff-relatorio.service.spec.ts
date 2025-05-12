import { TestBed } from '@angular/core/testing';

import { BffRelatorioService } from './bff-relatorio.service';

describe('BffRelatorioService', () => {
  let service: BffRelatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BffRelatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
