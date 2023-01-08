import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/index';
import { WebConstants } from '../util/web.constants';
import { TokenStorage } from '../util/token.storage';
import { map, first } from 'rxjs/operators';
import { AuthenticationToken } from '../model/authentication.token';
import { BaseResponse } from '../model/base.response';
import { AjaxHelper } from '../helper/ajax.helper';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable()
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<AuthenticationToken>;
  public currentUser: Observable<AuthenticationToken>;

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public tokenStorage: TokenStorage,
    public ajaxHelper: AjaxHelper) {
    let loggedInUser = this.tokenStorage.getByKey(WebConstants.USER.LOGGED_IN);

    //console.log("AuthenticationService.loggedInUser={}", loggedInUser);

    if (loggedInUser !== 'undefined') {
      this.currentUserSubject = new BehaviorSubject<AuthenticationToken>(JSON.parse(loggedInUser));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): AuthenticationToken {
    return this.currentUserSubject.value;
  }

  public login(loginObject: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.login(this.baseUrl + WebConstants.API_URL.LOGIN, loginObject)
      .pipe(map(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          let data = response.data;
          let token = data.token;
          this.tokenStorage.saveDetails(WebConstants.USER.LOGGED_IN,
            JSON.stringify(data));
          this.tokenStorage.saveTokenObject(token);
          this.currentUserSubject.next(data);
        } else {
          alert(response.value);
        }
        return response;
      }));
  }

  public logout(): void {
    let url = this.baseUrl + WebConstants.API_URL.LOGOUT;

    this.ajaxHelper.get(url)
      .pipe(first())
      .subscribe();

    this.tokenStorage.logOut();

    this.currentUserSubject.next(null);
  }

  public loggedIn(): boolean {
    return !!this.tokenStorage.loggedIn();
  }
}
