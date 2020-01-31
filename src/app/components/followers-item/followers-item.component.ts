import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-followers-item',
  templateUrl: './followers-item.component.html',
  styleUrls: ['./followers-item.component.css']
})
export class FollowersItemComponent implements OnInit {
	@Input() data: any;
	categories: string;

  constructor() { }

  ngOnInit() {
  	this.categories = this.data.followFrom.categories.join(',');
  }

}
