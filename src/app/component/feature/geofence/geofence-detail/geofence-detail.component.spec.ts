import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceDetailComponent } from './geofence-detail.component';

describe('GeofenceDetailComponent', () => {
  let component: GeofenceDetailComponent;
  let fixture: ComponentFixture<GeofenceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
