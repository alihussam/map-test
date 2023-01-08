import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefereneceComponent } from './preferenece.component';

describe('PrefereneceComponent', () => {
  let component: PrefereneceComponent;
  let fixture: ComponentFixture<PrefereneceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefereneceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefereneceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
