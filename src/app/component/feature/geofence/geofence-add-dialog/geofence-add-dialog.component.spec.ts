import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceAddDialogComponent } from './geofence-add-dialog.component';

describe('GeofenceAddDialogComponent', () => {
  let component: GeofenceAddDialogComponent;
  let fixture: ComponentFixture<GeofenceAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
