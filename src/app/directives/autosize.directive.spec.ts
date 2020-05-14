import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoSizeDirective } from './autosize.directive';
import { ElementRef } from '@angular/core';
import { MockElementRef } from '../interfaces/mock-element-ref';

describe('AutosizeDirective', () => {
  let component: AutoSizeDirective;
  let fixture: ComponentFixture<AutoSizeDirective>;
  let ref: MockElementRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSizeDirective ],
      providers: [
        { provide: ElementRef, useClass: MockElementRef }
      ]
    })
    .compileComponents();
  }));
  it('should create an instance', () => {
    const directive = new AutoSizeDirective(ref);
    expect(directive).toBeTruthy();
  });
});
