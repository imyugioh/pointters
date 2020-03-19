import { Component, EventEmitter, Output, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
import { UserService } from './../../../services/user.service';


@Component({
  selector: 'app-general-sidebar',
  templateUrl: './general-sidebar.component.html',
  styleUrls: ['./general-sidebar.component.css']
})
export class GeneralSidebarComponent implements OnInit {
  @Input() selectedTab: string;
  @Output() successHandler = new EventEmitter<boolean>();
  constructor(
    private authService: AuthService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  onClickLogout(): void {
    this.successHandler.emit(true);
  	this.authService.signout()
      .subscribe(
        (res) => {
          console.log('logout success');
        },
        (err) => {
          console.log(err);
        }
      );
    this.router.navigate(["/"]);
  }
}
