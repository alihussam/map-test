import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMapComponent } from './history-map.component';

describe('HistoryMapComponent', () => {
  let component: HistoryMapComponent;
  let fixture: ComponentFixture<HistoryMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
