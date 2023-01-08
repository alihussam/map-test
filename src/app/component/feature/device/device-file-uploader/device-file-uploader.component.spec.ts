import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFileUploaderComponent } from './device-file-uploader.component';

describe('DeviceFileUploaderComponent', () => {
  let component: DeviceFileUploaderComponent;
  let fixture: ComponentFixture<DeviceFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
