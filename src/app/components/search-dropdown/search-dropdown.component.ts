import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.css']
})
export class SearchDropdownComponent implements OnInit {
	@Input() query: string;

  constructor() { }

  ngOnInit() {
  }

}
