import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailModalComponent } from './request-detail-modal.component';

describe('RequestDetailModalComponent', () => {
  let component: RequestDetailModalComponent;
  let fixture: ComponentFixture<RequestDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
