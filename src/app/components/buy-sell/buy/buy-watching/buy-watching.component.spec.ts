import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyWatchingComponent } from './buy-watching.component';

describe('BuyWatchingComponent', () => {
  let component: BuyWatchingComponent;
  let fixture: ComponentFixture<BuyWatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyWatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyWatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
