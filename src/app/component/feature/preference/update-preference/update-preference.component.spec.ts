import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreferenceComponent } from './update-preference.component';

describe('UpdatePreferenceComponent', () => {
  let component: UpdatePreferenceComponent;
  let fixture: ComponentFixture<UpdatePreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
