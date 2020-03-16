import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-follow-sidebar',
  templateUrl: './follow-sidebar.component.html',
  styleUrls: ['./follow-sidebar.component.css']
})
export class FollowSidebarComponent implements OnInit {
  @Input() selectedTab: string;
   constructor() {
    
   }

  ngOnInit() {
    // console.log(this.selectedTab);
  }

}
