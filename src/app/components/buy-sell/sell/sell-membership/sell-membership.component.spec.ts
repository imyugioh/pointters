import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellMembershipComponent } from './sell-membership.component';

describe('SellMembershipComponent', () => {
  let component: SellMembershipComponent;
  let fixture: ComponentFixture<SellMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
