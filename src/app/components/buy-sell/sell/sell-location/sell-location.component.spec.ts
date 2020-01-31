import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellLocationComponent } from './sell-location.component';

describe('SellLocationComponent', () => {
  let component: SellLocationComponent;
  let fixture: ComponentFixture<SellLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
