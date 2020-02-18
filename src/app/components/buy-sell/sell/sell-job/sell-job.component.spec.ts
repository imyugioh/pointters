import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellJobComponent } from './sell-job.component';

describe('SellJobComponent', () => {
  let component: SellJobComponent;
  let fixture: ComponentFixture<SellJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
