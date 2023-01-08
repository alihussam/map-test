import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceDetailAddDialogComponent } from './geofence-detail-add-dialog.component';

describe('GeofenceDetailAddDialogComponent', () => {
  let component: GeofenceDetailAddDialogComponent;
  let fixture: ComponentFixture<GeofenceDetailAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceDetailAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceDetailAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
