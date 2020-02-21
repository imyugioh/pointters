import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSellerComponent } from './sell-seller.component';

describe('SellSellerComponent', () => {
  let component: SellSellerComponent;
  let fixture: ComponentFixture<SellSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
