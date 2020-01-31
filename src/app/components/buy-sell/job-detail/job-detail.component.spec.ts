import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailModalComponent } from './job-detail.component';

describe('JobDetailModalComponent', () => {
  let component: JobDetailModalComponent;
  let fixture: ComponentFixture<JobDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
