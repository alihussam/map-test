import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceDetailUpdateDialogComponent } from './geofence-detail-update-dialog.component';

describe('GeofenceDetailUpdateDialogComponent', () => {
  let component: GeofenceDetailUpdateDialogComponent;
  let fixture: ComponentFixture<GeofenceDetailUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceDetailUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceDetailUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
