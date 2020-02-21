import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSidebarComponent } from './sell-sidebar.component';

describe('SellSidebarComponent', () => {
  let component: SellSidebarComponent;
  let fixture: ComponentFixture<SellSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
