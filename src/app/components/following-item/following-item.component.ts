import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-following-item',
  templateUrl: './following-item.component.html',
  styleUrls: ['./following-item.component.css']
})
export class FollowingItemComponent implements OnInit {
	@Input() data: any;
	categories: string;

  constructor() { }

  ngOnInit() {
  	this.categories = this.data.categories.join(',');
  }

}
