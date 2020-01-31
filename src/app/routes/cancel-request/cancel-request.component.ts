import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})

export class CancelRequestComponent implements OnInit {
  ngOnInit() {
    $(":checkbox").labelauty({
      label: false
    });
  }

}
