import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceUpdateDialogComponent } from './geofence-update-dialog.component';

describe('GeofenceUpdateDialogComponent', () => {
  let component: GeofenceUpdateDialogComponent;
  let fixture: ComponentFixture<GeofenceUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
