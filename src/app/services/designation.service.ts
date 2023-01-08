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
export class DesignationService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(public ajaxHelper: AjaxHelper) {
  }


  getAllDesingations(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DESIGNATION.FIND_ALL_DESIGNATIONS);
  }

  getAllDesingationsActive(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DESIGNATION.FIND_ALL_DESIGNATIONS_Active);
  }

}
