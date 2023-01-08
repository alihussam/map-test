import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordNewComponent } from './change-password-new.component';

describe('ChangePasswordNewComponent', () => {
  let component: ChangePasswordNewComponent;
  let fixture: ComponentFixture<ChangePasswordNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
