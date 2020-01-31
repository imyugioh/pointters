import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyRequestComponent } from './buy-request.component';

describe('BuyRequestComponent', () => {
  let component: BuyRequestComponent;
  let fixture: ComponentFixture<BuyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
