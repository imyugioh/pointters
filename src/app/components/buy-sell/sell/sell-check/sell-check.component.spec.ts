import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCheckComponent } from './sell-check.component';

describe('SellCheckComponent', () => {
  let component: SellCheckComponent;
  let fixture: ComponentFixture<SellCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
