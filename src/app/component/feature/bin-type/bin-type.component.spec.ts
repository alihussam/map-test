import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinTypeComponent } from './bin-type.component';

describe('BinTypeComponent', () => {
  let component: BinTypeComponent;
  let fixture: ComponentFixture<BinTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
