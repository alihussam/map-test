import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { WebConstants } from '../util/web.constants';
import { BaseResponse } from '../model/base.response';
import { AjaxHelper } from '../helper/ajax.helper';
import { environment } from 'src/environments/environment';

/**
 * @author muazam tareen
 */

@Injectable({
  providedIn: 'root'
})
export class BinSpotColorService { 
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  getAllByOrganization(organizationId: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.BIN_SPOT_COLOR.FIND_BY_ORGANIZATION + "/" + organizationId);
  }

  getAll(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.BIN_SPOT_COLOR.FIND);
  }

  add(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.BIN_SPOT_COLOR.ADD, payload);
  }

  update(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.BIN_SPOT_COLOR.UPDATE, payload);
  }

  delete(preferenceId: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.BIN_SPOT_COLOR.DELETE + preferenceId);
  }
}
