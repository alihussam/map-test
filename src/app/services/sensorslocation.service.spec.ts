import { TestBed } from '@angular/core/testing';

import { SensorslocationService } from './sensorslocation.service';

describe('SensorslocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorslocationService = TestBed.get(SensorslocationService);
    expect(service).toBeTruthy();
  });
});
