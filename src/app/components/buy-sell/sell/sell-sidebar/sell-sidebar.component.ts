import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-sell-sidebar',
  templateUrl: './sell-sidebar.component.html',
  styleUrls: ['./sell-sidebar.component.css']
})
export class SellSidebarComponent implements OnInit {
  @Input() selectedTab: string;
  constructor() { }

  ngOnInit() {
  }

}
