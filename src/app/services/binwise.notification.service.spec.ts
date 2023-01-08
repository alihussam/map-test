import { TestBed } from '@angular/core/testing';

import {BinWiseNotificationService} from './binwise.notification.service';

describe('BinWiseNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BinWiseNotificationService = TestBed.get(BinWiseNotificationService);
    expect(service).toBeTruthy();
  });
});
