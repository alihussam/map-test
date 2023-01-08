import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceDetailAddComponent } from './geofence-detail-add.component';

describe('GeofenceDetailAddComponent', () => {
  let component: GeofenceDetailAddComponent;
  let fixture: ComponentFixture<GeofenceDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
