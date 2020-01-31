import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCredintalsComponent } from './signup-credintals.component';

describe('SignupCredintalsComponent', () => {
  let component: SignupCredintalsComponent;
  let fixture: ComponentFixture<SignupCredintalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupCredintalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCredintalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
