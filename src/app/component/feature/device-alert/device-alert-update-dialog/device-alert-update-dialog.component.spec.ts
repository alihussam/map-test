import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAlertUpdateDialogComponent } from './device-alert-update-dialog.component';

describe('DeviceAlertUpdateDialogComponent', () => {
  let component: DeviceAlertUpdateDialogComponent;
  let fixture: ComponentFixture<DeviceAlertUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAlertUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAlertUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
