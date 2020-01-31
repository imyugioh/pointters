import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingItemComponent } from './following-item.component';

describe('FollowingItemComponent', () => {
  let component: FollowingItemComponent;
  let fixture: ComponentFixture<FollowingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
