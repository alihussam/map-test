import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastExpiredSessionDialogComponent } from './past-expired-session-dialog.component';

describe('PastExpiredSessionDialogComponent', () => {
  let component: PastExpiredSessionDialogComponent;
  let fixture: ComponentFixture<PastExpiredSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastExpiredSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastExpiredSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
