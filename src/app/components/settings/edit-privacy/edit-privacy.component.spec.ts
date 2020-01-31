import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrivacyComponent } from './edit-privacy.component';

describe('EditPrivacyComponent', () => {
  let component: EditPrivacyComponent;
  let fixture: ComponentFixture<EditPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
