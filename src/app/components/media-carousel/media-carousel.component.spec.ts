import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCarouselComponent } from './media-carousel.component';

describe('MediaCarouselComponent', () => {
  let component: MediaCarouselComponent;
  let fixture: ComponentFixture<MediaCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
