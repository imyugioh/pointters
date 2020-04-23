import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPersonalComponent } from './signup-personal.component';

describe('SignupPersonalComponent', () => {
  let component: SignupPersonalComponent;
  let fixture: ComponentFixture<SignupPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
