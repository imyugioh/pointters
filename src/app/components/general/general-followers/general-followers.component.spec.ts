import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFollowersComponent } from './general-followers.component';

describe('GeneralFollowersComponent', () => {
  let component: GeneralFollowersComponent;
  let fixture: ComponentFixture<GeneralFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
