import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.css']
})
export class MenuDropdownComponent implements OnInit {
  @Output() successHandler = new EventEmitter<boolean>();

  public user: User;
  public stats;

  constructor(
  	private authService: AuthService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      console.log("receive user : ");
      console.dir(user);
      this.user = user;
    })

    this.userService.stats.subscribe(stats => {
      this.stats = stats;
    })
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
