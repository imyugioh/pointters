import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../../services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { User } from "./../../../interfaces/user";
import { AuthService } from "./../../../services/auth.service";
import { Observable } from "rxjs/Observable";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-edit-password",
  templateUrl: "./edit-password.component.html",
  styleUrls: ["./edit-password.component.css"]
})
export class EditPasswordComponent implements OnInit {
  public form: FormGroup;
  public user: User;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {

    this.form = fb.group({
      old_pass: [null, [Validators.required,] ],
      new_pass: [null, [Validators.required, Validators.minLength(6)]],
      new_pass_confirm: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.user = { ...this.user };

    this.userService.user.subscribe(user => {
      this.user = user;
    });
  }

  onSave() {

    const keys = Object.keys(this.form.controls);
    keys.forEach(key => {
      this.form.get(key).markAsDirty();
      this.form.get(key).markAsTouched();
    });

    if(this.form.valid) {
      this.userService.changePassword(
        this.form.get('old_pass').value,
        this.form.get('new_pass').value
      )
      .catch(err => {
        this.form.get('old_pass').setErrors({
          ...this.form.get('old_pass').errors,
          'invalid_old': true,
        });

        return Observable.empty();
      })
      .subscribe(res => {
        this.form.reset();

        this.toastr.success('Password succefully changed', 'Password edit');
      });

    }
  }
}
