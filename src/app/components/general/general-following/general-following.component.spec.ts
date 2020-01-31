import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFollowingComponent } from './general-following.component';

describe('GeneralFollowingComponent', () => {
  let component: GeneralFollowingComponent;
  let fixture: ComponentFixture<GeneralFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
