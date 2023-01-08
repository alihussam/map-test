import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAlertAddDialogComponent } from './device-alert-add-dialog.component';

describe('DeviceAlertAddDialogComponent', () => {
  let component: DeviceAlertAddDialogComponent;
  let fixture: ComponentFixture<DeviceAlertAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAlertAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAlertAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
