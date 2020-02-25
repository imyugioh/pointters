import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellVerificationComponent } from './sell-verification.component';

describe('SellVerificationComponent', () => {
  let component: SellVerificationComponent;
  let fixture: ComponentFixture<SellVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
