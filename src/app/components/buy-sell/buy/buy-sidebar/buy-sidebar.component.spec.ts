import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySidebarComponent } from './buy-sidebar.component';

describe('BuySidebarComponent', () => {
  let component: BuySidebarComponent;
  let fixture: ComponentFixture<BuySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
