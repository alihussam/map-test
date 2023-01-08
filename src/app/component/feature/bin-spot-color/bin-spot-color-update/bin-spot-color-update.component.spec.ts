import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinSpotColorUpdateComponent } from './bin-spot-color-update.component';

describe('BinSpotColorUpdateComponent', () => {
  let component: BinSpotColorUpdateComponent;
  let fixture: ComponentFixture<BinSpotColorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinSpotColorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinSpotColorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
