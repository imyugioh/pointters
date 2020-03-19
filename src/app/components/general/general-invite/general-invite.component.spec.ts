import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInviteComponent } from './general-invite.component';

describe('GeneralInviteComponent', () => {
  let component: GeneralInviteComponent;
  let fixture: ComponentFixture<GeneralInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
