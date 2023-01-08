import { Injectable } from '@angular/core';
import { WebConstants } from '../util/web.constants';
import { Observable } from 'rxjs';
import { BaseResponse } from '../model/base.response';
import { AjaxHelper } from '../helper/ajax.helper';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  public baseUrl:string = environment.BaseServiceUrl;


  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DEALER.FIND_ALL_DEALER);
  }

  addDealer(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.DEALER.ADD_DEALER, payload);
  }

  updateDealer(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.DEALER.UPDATE_DEALER, payload);
  }

  deleteDealer(dealerId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DEALER.DELETE_DEALER + dealerId);
  }

  findDealerByOrganizationId(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DEALER.FIND_DEALER_BY_ORGANIZATION + organizationId);
  }

}
