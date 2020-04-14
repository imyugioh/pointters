import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRelatedComponent } from './service-related.component';

describe('ServiceRelatedComponent', () => {
  let component: ServiceRelatedComponent;
  let fixture: ComponentFixture<ServiceRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
