import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-reviews',
  templateUrl: './service-reviews.component.html',
  styleUrls: ['./service-reviews.component.css']
})
export class ServiceReviewsComponent implements OnInit {
@Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
