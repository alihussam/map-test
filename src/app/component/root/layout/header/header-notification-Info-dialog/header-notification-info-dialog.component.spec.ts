import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HeaderNotificationInfoDialogComponent} from './header-notification-info-dialog.component';

describe('HeaderNotificationInfoDialogComponent', () => {
  let component: HeaderNotificationInfoDialogComponent;
  let fixture: ComponentFixture<HeaderNotificationInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderNotificationInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNotificationInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
