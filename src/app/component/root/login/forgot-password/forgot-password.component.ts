import { Component, OnInit } from '@angular/core';
import { WebConstants } from '../../../../util/web.constants';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../services/user.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
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

    let forgetPasswordObject = {
      origin: WebConstants.ORIGIN.WEB,
      emailAddress: data.emailAddress
    };

    this.userService.forgotPassword(forgetPasswordObject)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success("Click the link in the email", "Email send successfully");
        }
      });
  }
}
