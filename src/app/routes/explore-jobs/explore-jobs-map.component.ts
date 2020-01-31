import { Component, EventEmitter, OnChanges, Output, Input } from '@angular/core';

import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'core-map-content',
  template: '',
})
export class MapContentComponent implements OnChanges {
  @Output() onMapLoad: EventEmitter<{}> = new EventEmitter<{}>();
  @Input() mapInit: boolean = false;

  constructor(public gMaps: GoogleMapsAPIWrapper) {}

  ngOnChanges(changes) {
    if (changes.mapInit && changes.mapInit.currentValue === true) {
      this.gMaps.getNativeMap().then((map) => {
        this.onMapLoad.emit(map);
      });
    }
  }
}
