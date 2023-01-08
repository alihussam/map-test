import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinSpotAddComponent } from './bin-spot-add.component';

describe('BinSpotAddComponent', () => {
  let component: BinSpotAddComponent;
  let fixture: ComponentFixture<BinSpotAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinSpotAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinSpotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
