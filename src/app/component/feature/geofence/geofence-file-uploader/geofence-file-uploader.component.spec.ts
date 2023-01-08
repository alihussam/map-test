import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceFileUploaderComponent } from './geofence-file-uploader.component';

describe('GeofenceFileUploaderComponent', () => {
  let component: GeofenceFileUploaderComponent;
  let fixture: ComponentFixture<GeofenceFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
