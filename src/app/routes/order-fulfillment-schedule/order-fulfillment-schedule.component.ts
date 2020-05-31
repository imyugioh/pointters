import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-order-fulfillment-schedule',
  templateUrl: './order-fulfillment-schedule.component.html',
  styleUrls: ['./order-fulfillment-schedule.component.css']
})

export class OrderFulfillmentScheduleComponent implements OnInit {
  ngOnInit() {
    $(".order-fulfillment-schedule :checkbox").labelauty({
      label: false
    });
  }

}
