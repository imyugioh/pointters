import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreLiveOffersComponent } from './explore-live-offers.component';

describe('ExploreLiveOffersComponent', () => {
  let component: ExploreLiveOffersComponent;
  let fixture: ComponentFixture<ExploreLiveOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreLiveOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreLiveOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
