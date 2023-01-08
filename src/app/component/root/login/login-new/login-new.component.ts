import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/util/token.storage';
import { Router } from '@angular/router';
import { WebConstants } from 'src/app/util/web.constants';
import { first } from 'rxjs/operators';
import { Login } from 'src/app/model/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.scss']
})
export class LoginNewComponent implements OnInit {
  public loginForm: FormGroup;
  public oldPasswordEye = true;

  constructor(public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public router: Router,
    public tokenStorage: TokenStorage) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() !== null) {
      this.router.navigate([WebConstants.WEB_URL.MAP]);
    }
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    let loginObject = new Login();
    loginObject.origin = WebConstants.ORIGIN.WEB;
    loginObject.username = this.loginForm.controls.username.value;
    loginObject.password = this.loginForm.controls.password.value; 

    this.authenticationService.login(loginObject)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.router.navigate([WebConstants.WEB_URL.MAP]);
        }
      });
  }

  forgetPassword() {
    this.router.navigate([WebConstants.WEB_URL.FORGOT_PASSWORD]);
  }

  // forgetUsername() {
  //   this.router.navigate([WebConstants.WEB_URL.FORGOT_USERNAME]);
  // }

  currentYear(): number {
    return new Date().getFullYear();
    
    }
}