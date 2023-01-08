import { TestBed } from '@angular/core/testing';

import { ExcelExportDataService } from './excel-export-data.service';

describe('ExcelExportDataService', () => {
  let service: ExcelExportDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelExportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
