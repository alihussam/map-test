import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WebConstants } from 'src/app/util/web.constants';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.scss']
})
export class ForgetUsernameComponent implements OnInit {
  public form: any;

  constructor(public dialog: MatDialog,
    public userService: UserService,
    public toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      emailAddress: new FormControl("", Validators.compose([Validators.email, Validators.required])),
    });
  }

  sendEmail() {
    let data = this.form.getRawValue();

    this.userService.forgotEmailAddress(data.emailAddress)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          //console.log(response.data);
          this.toastrService.success("Click the link in the email", "Email send successfully");
        }
      });
  }
}