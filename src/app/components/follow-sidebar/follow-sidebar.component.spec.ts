import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowSidebarComponent } from './follow-sidebar.component';

describe('FollowSidebarComponent', () => {
  let component: FollowSidebarComponent;
  let fixture: ComponentFixture<FollowSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
