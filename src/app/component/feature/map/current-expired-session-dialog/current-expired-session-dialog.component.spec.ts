import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentExpiredSessionDialogComponent } from './current-expired-session-dialog.component';

describe('CurrentExpiredSessionDialogComponent', () => {
  let component: CurrentExpiredSessionDialogComponent;
  let fixture: ComponentFixture<CurrentExpiredSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentExpiredSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentExpiredSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
