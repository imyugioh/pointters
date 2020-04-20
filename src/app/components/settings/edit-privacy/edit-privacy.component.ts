import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-edit-privacy',
  templateUrl: './edit-privacy.component.html',
  styleUrls: ['./edit-privacy.component.css']
})
export class EditPrivacyComponent implements OnInit {

  public user: any;

  public view_location: string;
  public view_phone: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.user
      .filter(val => val != null)
      .subscribe(user => {
        this.user = user;

        this.view_phone = this.user.settings.phoneViewPermission;
        this.view_location = this.user.settings.locationViewPermission;
        
      });
  }

  onViewPhoneChange(evt) {
    this.userService.setPermissions({
      'phoneViewPermission': evt,
      'locationViewPermission': this.view_location,
    }).subscribe(res => {
      
    });

    
  }

  onViewLocationChange(evt) {
    this.userService.setPermissions({
      'phoneViewPermission': this.view_phone,
      'locationViewPermission': evt,
    }).subscribe();
  }
}
