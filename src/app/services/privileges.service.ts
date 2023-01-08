import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { WebConstants } from '../util/web.constants';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(public ajaxHelper: AjaxHelper) {
  }

  getAll(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PRIVILEGE.FIND_ALL_PRIVILEGE);
  }
}
