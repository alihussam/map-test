import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinTypeAddComponent } from './bin-type-add.component';

describe('BinTypeAddComponent', () => {
  let component: BinTypeAddComponent;
  let fixture: ComponentFixture<BinTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
