import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDropdownComponent } from './message-dropdown.component';

describe('MessageDropdownComponent', () => {
  let component: MessageDropdownComponent;
  let fixture: ComponentFixture<MessageDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
