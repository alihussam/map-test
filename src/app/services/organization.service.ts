import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.FIND_ALL_ORGANIZATION);
  }

  //
//AM//

  getAllActive(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.FIND_ALL_ACTIVE_ORGANIZATION);
  }

  //
  addOrganization(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.ORGANIZATION.ADD_ORGANIZATION, payload);
  }

  updateOrganization(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.ORGANIZATION.UPDATE_ORGANIZATION, payload);
  }

  deleteOrganization(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.DELETE_ORGANIZATION + organizationId);
  }

  getOrganizationById(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.ORGANIZATION.FIND_ORGANIZATION_BY_ID + organizationId);
  }
}
