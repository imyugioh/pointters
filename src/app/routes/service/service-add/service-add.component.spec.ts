import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddComponent } from './service-add.component';

describe('ServiceAddComponent', () => {
  let component: ServiceAddComponent;
  let fixture: ComponentFixture<ServiceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
