import { TestBed } from '@angular/core/testing';

import { DeviceAlertService } from './device-alert.service';

describe('DeviceAlertService', () => {
  let service: DeviceAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
