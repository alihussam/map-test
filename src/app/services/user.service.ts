import { Injectable } from '@angular/core';

import { WebConstants } from '../util/web.constants';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/base.response';
import { AjaxHelper } from '../helper/ajax.helper';
import { environment } from 'src/environments/environment';
import {first} from 'rxjs/operators';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({ providedIn: 'root' })
export class UserService {

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.FIND_ALL);
  }

  addUser(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.USER.ADD_USER, payload);
  }

  updateUser(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.USER.UPDATE_USER, payload);
  }

  deleteUser(userId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.DELETE_USER + userId);
  }

  getUserById(userId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.FIND_USER_BY_ID + userId);
  }

  changeUserPassword(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.USER.CHANGE_PASSWORD, payload);
  }

  forgotPassword(payload: any): Observable<BaseResponse<any>> {
    const url = this.baseUrl + WebConstants.API_URL.USER.FORGOT_PASSWORD;

    return this.ajaxHelper.post(url, payload);
  }
  /// amk for chack

  // verifyResetToken(payload: any): Observable<BaseResponse<any>> {
  //   let url = "https://apps.conurets.com:8443/binwise" + WebConstants.API_URL.USER.VERIFY_RESET_TOKEN + "/" + payload;

  //   return this.ajaxHelper.get(url);
  // }

  verifyResetToken(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.VERIFY_RESET_TOKEN + '/' + payload);
  }

  resetPassword(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.USER.RESET_PASSWORD, payload);
  }

  findUserPrivilages(userId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.FIND_USER_PRIVILEGES + userId);
  }

  addUserPrivilage(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.USER.ADD_USER_PRIVILEGE, payload);
  }

  deleteUserPrivilage(userId: Number, privilageId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.DELETE_USER_PRIVILEGE + userId + '/' + privilageId);
  }

  forgotEmailAddress(payload: any): Observable<BaseResponse<any>> {
    const url = this.baseUrl + WebConstants.API_URL.USER.FORGOT_EMAIL_ADDRESS + '/' + payload;
    return this.ajaxHelper.get(url);
  }

  // addUserStore(payload: any): Observable<BaseResponse<any>> {
  //   return this.ajaxHelper.post(WebConstants.API_URL.USER.ADD_USER_STORE, payload);
  // }

  // updateUserStore(payload: any): Observable<BaseResponse<any>> {
  //   return this.ajaxHelper.post(WebConstants.API_URL.USER.UPDATE_USER_STORE, payload);
  // }

  // findUserStores(userId: any): Observable<BaseResponse<any>> {
  //   return this.ajaxHelper.get(WebConstants.API_URL.USER.FIND_ALL_USER_STORES + userId);
  // }

  findUserOrganizations(ogranizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.FIND_ALL_USER_BY_ORGANIZATION + ogranizationId);
  }

  changePassword(changePassword: object): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.USER.CHANGE_PASSWORD, changePassword);
  }

  getUserProfile(userId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.PROFILE + '/' + userId);
  }

  terminateUser(userId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.USER.TERMINATE_USER + userId);
  }

}
