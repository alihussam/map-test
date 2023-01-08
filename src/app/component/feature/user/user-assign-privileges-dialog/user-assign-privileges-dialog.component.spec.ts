import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssignPrivilegesDialogComponent } from './user-assign-privileges-dialog.component';

describe('UserAssignPrivilagesDialogComponent', () => {
  let component: UserAssignPrivilegesDialogComponent;
  let fixture: ComponentFixture<UserAssignPrivilegesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssignPrivilegesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignPrivilegesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
