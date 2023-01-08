import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignDealerDialogComponent } from './user-assign-dealer-dialog.component';

describe('UserAssignDealerDialogComponent', () => {
  let component: UserAssignDealerDialogComponent;
  let fixture: ComponentFixture<UserAssignDealerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignDealerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignDealerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
