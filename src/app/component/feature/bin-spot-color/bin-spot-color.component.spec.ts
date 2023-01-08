import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinSpotColorComponent } from './bin-spot-color.component';

describe('BinSpotColorComponent', () => {
  let component: BinSpotColorComponent;
  let fixture: ComponentFixture<BinSpotColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinSpotColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinSpotColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
