import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-buy-sidebar',
  templateUrl: './buy-sidebar.component.html',
  styleUrls: ['./buy-sidebar.component.css']
})
export class BuySidebarComponent implements OnInit {
  @Input() selectedTab: string;
  constructor() { }

  ngOnInit() {
  }

}
