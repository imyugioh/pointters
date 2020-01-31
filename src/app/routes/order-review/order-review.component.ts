import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})

export class OrderReviewComponent implements OnInit {

  private rating = 0;

  ngOnInit() {
    $(".order-review :checkbox").labelauty({
      label: false
    });
  }

}
