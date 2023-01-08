import { TestBed } from '@angular/core/testing';

import { GeofenceDetailService } from './geofence-detail.service';

describe('GeofenceDetailService', () => {
  let service: GeofenceDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeofenceDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
