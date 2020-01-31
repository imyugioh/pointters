import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-related',
  templateUrl: './service-related.component.html',
  styleUrls: ['./service-related.component.css']
})
export class ServiceRelatedComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
