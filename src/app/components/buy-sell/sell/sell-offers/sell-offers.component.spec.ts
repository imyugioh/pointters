import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOffersComponent } from './sell-offers.component';

describe('SellOffersComponent', () => {
  let component: SellOffersComponent;
  let fixture: ComponentFixture<SellOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
