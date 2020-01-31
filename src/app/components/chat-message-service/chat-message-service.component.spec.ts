import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageServiceComponent } from './chat-message-service.component';

describe('ChatMessageServiceComponent', () => {
  let component: ChatMessageServiceComponent;
  let fixture: ComponentFixture<ChatMessageServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
