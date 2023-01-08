import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinSpotUpdateComponent } from './bin-spot-update.component';

describe('BinSpotUpdateComponent', () => {
  let component: BinSpotUpdateComponent;
  let fixture: ComponentFixture<BinSpotUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinSpotUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinSpotUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
