import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageOfferComponent } from './chat-message-offer.component';

describe('ChatMessageOfferComponent', () => {
  let component: ChatMessageOfferComponent;
  let fixture: ComponentFixture<ChatMessageOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
