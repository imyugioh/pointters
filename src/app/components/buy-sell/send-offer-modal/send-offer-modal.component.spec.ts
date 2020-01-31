import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOfferModalComponent } from './send-offer-modal.component';

describe('SendOfferModalComponent', () => {
  let component: SendOfferModalComponent;
  let fixture: ComponentFixture<SendOfferModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOfferModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
