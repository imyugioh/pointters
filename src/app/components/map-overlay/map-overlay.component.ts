import { Subscription } from "rxjs"
import {
  Input, Component, Optional,
  TemplateRef, ViewChild, ElementRef
} from "@angular/core"

import {
  LatLngBounds, LatLng,
  GoogleMapsAPIWrapper
} from "@agm/core"


import { GoogleMap } from "@agm/core/services/google-maps-types"
declare var google: any

@Component({
  selector:"agm-overlay",
  template:'<div #content><div style="position:absolute"><ng-content></ng-content></div></div>'
})
export class MapOverlayComponent {
  overlayView: any;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() index: number;
  @Input() overlays: object  = {};
  @Input() addOverlayKey: Function;
  @Input() removeOverlayKey: Function;
  @Input() handleOverlayClick: Function;

  @ViewChild('content', { read: ElementRef }) template: ElementRef

  constructor(
    protected _mapsWrapper:GoogleMapsAPIWrapper
  ){}

  ngOnChanges( changes ){
    if( (changes.latitude || changes.longitude) && this.overlayView ){
      // this.destroy()
      // this.load()
    }

  }

  ngOnDestroy() {
    this.destroy()
  }

  destroy(){
    if (this.overlayView) this.overlayView.setMap(null)
    let key = `${this.latitude}|${this.longitude}`;
    this.removeOverlayKey(key);
    delete this.overlayView
  }

  ngAfterViewInit() {
    let key = `${this.latitude}|${this.longitude}`;
    if (!this.overlays[key]) {
      this.addOverlayKey(key);
      this.load()
    }
  }

  load(){
    this._mapsWrapper.getNativeMap()
    .then(map=>{
      // appends to map as overlays (markers)
      this.drawOnMap( map )

      const latlng = new google.maps.LatLng(this.latitude, this.longitude)

      // configures the bounds of the map to fit the markers
      this.addBounds( latlng, map )
    })
  }

  promiseBounds():Promise<LatLngBounds>{
    return this._mapsWrapper.getNativeMap()
    .then(map=>{
      let bounds = map.getBounds() || map['bounds']
      if( !bounds ){
        bounds = new google.maps.LatLngBounds()
        map['bounds'] = bounds
      }
      return bounds
    })
  }

  addBounds( latlng:LatLng, map:GoogleMap ){
    this.promiseBounds()
    .then(bounds=>{
      const zero = bounds.isEmpty()
      bounds.extend( latlng )
      if( !zero ){
      //  const zoom = map.getZoom()
      //  map.fitBounds( bounds )//center map on all overlays
      //  setTimeout(()=>map.setZoom(zoom), 60)//reset the zoom the bounds steals
      }
    })
  }

  drawOnMap( map:GoogleMap ){
    let self = this;
    this.overlayView = this.overlayView || new google.maps.OverlayView()
    const latlng = new google.maps.LatLng(this.latitude,this.longitude)
    const elm = this.template.nativeElement.children[0]

    this.overlayView.onAdd = function() {
        if ( !this.div ) {
          this.div = elm;
          this.getPanes().overlayImage.appendChild( elm );

          google.maps.event.addDomListenerOnce(this.div, 'click', function() {
            if (self.handleOverlayClick) self.handleOverlayClick(self.index);
          });
        }
    }

    this.overlayView.remove = function(){
        this.div.parentNode.removeChild(this.div);
        delete this.div
    }

    this.overlayView.draw = function(){
      if ( !this.div ) {
        this.div = elm
        this.getPanes().overlayImage.appendChild( elm )
      }

      const point = this.getProjection().fromLatLngToDivPixel( latlng )

      if (point) {
        elm.style.left = (point.x - 10) + 'px'
        elm.style.top = (point.y - 20) + 'px'
      }
    }
    this.overlayView.setMap( map )//igniter to append to element
  }
}
