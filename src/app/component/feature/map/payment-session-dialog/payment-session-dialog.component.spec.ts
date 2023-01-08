import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSessionDialogComponent } from './payment-session-dialog.component';

describe('PaymentSessionDialogComponent', () => {
  let component: PaymentSessionDialogComponent;
  let fixture: ComponentFixture<PaymentSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
