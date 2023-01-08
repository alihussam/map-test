import { TestBed } from '@angular/core/testing';

import { ExcelExportApiService } from './excel-export-api.service';

describe('ExcelExportApiService', () => {
  let service: ExcelExportApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelExportApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
