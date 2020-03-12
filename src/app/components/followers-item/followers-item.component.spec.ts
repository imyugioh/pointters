import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersItemComponent } from './followers-item.component';

describe('FollowersItemComponent', () => {
  let component: FollowersItemComponent;
  let fixture: ComponentFixture<FollowersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
