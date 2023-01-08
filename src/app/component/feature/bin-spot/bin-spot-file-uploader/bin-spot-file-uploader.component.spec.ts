import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinSpotFileUploaderComponent } from './bin-spot-file-uploader.component';

describe('BinSpotFileUploaderComponent', () => {
  let component: BinSpotFileUploaderComponent;
  let fixture: ComponentFixture<BinSpotFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinSpotFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinSpotFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
