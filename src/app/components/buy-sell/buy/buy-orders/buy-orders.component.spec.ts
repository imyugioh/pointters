import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrdersComponent } from './buy-orders.component';

describe('BuyOrdersComponent', () => {
  let component: BuyOrdersComponent;
  let fixture: ComponentFixture<BuyOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
