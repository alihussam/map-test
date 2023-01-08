import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/root/layout/footer/footer.component';
import { HeaderComponent } from './component/root/layout/header/header.component';
import { LeftSideMenuComponent } from './component/root/layout/left-side-menu/left-side-menu.component';
import { AddNewPasswordComponent } from './component/root/login/add-new-password/add-new-password.component';
import { ForgetUsernameComponent } from './component/root/login/forget-username/forget-username.component';
import { ForgotPasswordComponent } from './component/root/login/forgot-password/forgot-password.component';
import { LoginNewComponent } from './component/root/login/login-new/login-new.component';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { MatarialModule } from './matarial/matarial.module';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorage } from './util/token.storage';
import { WebUtil } from './util/web.util';
import {WebSocketConfiguration} from './websocket/websocket.configuration';
import {HeaderNotificationInfoDialogComponent} from
    './component/root/layout/header/header-notification-Info-dialog/header-notification-info-dialog.component';
import {HeaderNotificationTableDialogComponent} from
    './component/root/layout/header/header-notification-table-dialog/header-notification-table-dialog.component';
import { ChangePasswordNewComponent } from './component/root/login/change-password-new/change-password-new.component';
import { UserProfileNewComponent } from './component/root/login/user-profile-new/user-profile-new.component';
import { AccessDeniedComponent } from './component/root/login/access-denied/access-denied.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: "#ffffff",
  // bgsOpacity: 0.5,
  // bgsPosition: POSITION.centerCenter,
  // bgsSize: 50,
  // bgsType: SPINNER.threeBounce,
   blur: 10,
  // delay: 0,
  // fastFadeOut: true,
  // fgsColor: "#ffffff",

  fgsColor: '#df8344',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 50,
  fgsType: SPINNER.threeStrings,
  gap: 24,
  logoPosition: POSITION.centerCenter,
  logoSize: 100,
  logoUrl: 'assets/images/ps.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(30,30,47,0.9)',
  // pbColor: "#ffffff",
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 3,
  hasProgressBar: false,
  text: '',
  textColor: '#FFFFFF',
  textPosition: POSITION.centerCenter,
  maxTime: -1,
  minTime: 300,
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AddNewPasswordComponent,
    ForgotPasswordComponent,
    LeftSideMenuComponent,
    LoginNewComponent,
    ForgetUsernameComponent,
    HeaderNotificationInfoDialogComponent,
    HeaderNotificationTableDialogComponent,
    ChangePasswordNewComponent,
    UserProfileNewComponent,
    AccessDeniedComponent,
   
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatarialModule,
    NgxUiLoaderRouterModule,
  
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    // NgxUiLoaderHttpModule.forRoot({
    //   excludeRegexp: [

    //   //   "/api/logout"
    //   "api/map/find-expired-sessions"
    //   ],
    //   showForeground:true,
    //   }),

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
      disableTimeOut: false,
      easeTime: 500,
      // extendedTimeOut: 40000,
      newestOnTop: false,
      closeButton: true,
      maxOpened: 4,
      tapToDismiss: true,
    }),

    AppRoutingModule,
  ],
  providers: [
    WebSocketConfiguration,
    AuthenticationService,
    TokenStorage,
    ToastrService,
    WebUtil,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
