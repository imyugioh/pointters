import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFulfillmentFilesComponent } from './order-fulfillment-files.component';

describe('OrderFulfillmentFilesComponent', () => {
  let component: OrderFulfillmentFilesComponent;
  let fixture: ComponentFixture<OrderFulfillmentFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFulfillmentFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFulfillmentFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
