import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinTypeUpdateComponent } from './bin-type-update.component';

describe('BinTypeUpdateComponent', () => {
  let component: BinTypeUpdateComponent;
  let fixture: ComponentFixture<BinTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
