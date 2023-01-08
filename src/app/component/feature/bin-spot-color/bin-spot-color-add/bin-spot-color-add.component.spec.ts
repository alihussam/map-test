import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinSpotColorAddComponent } from './bin-spot-color-add.component';

describe('BinSpotColorAddComponent', () => {
  let component: BinSpotColorAddComponent;
  let fixture: ComponentFixture<BinSpotColorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinSpotColorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinSpotColorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
