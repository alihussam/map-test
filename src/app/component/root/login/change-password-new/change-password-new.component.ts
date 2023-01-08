

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { TokenStorage } from '../../../../util/token.storage';
import { first } from 'rxjs/operators';
import { WebConstants } from '../../../../util/web.constants';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password-new',
  templateUrl: './change-password-new.component.html',
  styleUrls: ['./change-password-new.component.scss']
})

export class ChangePasswordNewComponent implements OnInit {

  public form: FormGroup;
  
  oldPasswordEye=true;
  newPasswordEye=true;
  retypeNewPasswordEye=true;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.initializeForm();

    
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10)])],
      newPassword: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10)])],
      retypeNewPassword: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10)])]
    });
  }

  changePassword() {
  
     
  
    if (this.form.invalid) {
      return;
    }

    let oldPassword = this.form.controls.oldPassword.value;
    let newPassword = this.form.controls.newPassword.value;
    let retypeNewPassword = this.form.controls.retypeNewPassword.value;

    if (oldPassword === newPassword) {
      alert("New password should be different to old password");
      return;
    } else if (newPassword !== retypeNewPassword) {
      alert("New password does not matched with re-entered password");
      return;
    }

    let formValue = {
      userId: this.tokenStorage.getUserId(),
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    this.userService.changePassword(formValue)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"password is changed successfully");
          this.router.navigate(["user-profile"]);
        }
      });
  }


}
