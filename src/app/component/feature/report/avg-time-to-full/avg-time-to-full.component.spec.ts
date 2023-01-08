import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgTimeToFullComponent } from './avg-time-to-full.component';

describe('AvgTimeToFullComponent', () => {
  let component: AvgTimeToFullComponent;
  let fixture: ComponentFixture<AvgTimeToFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvgTimeToFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgTimeToFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
