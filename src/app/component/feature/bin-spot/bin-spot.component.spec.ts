import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinSpotComponent } from './bin-spot.component';

describe('BinSpotComponent', () => {
  let component: BinSpotComponent;
  let fixture: ComponentFixture<BinSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
