import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebConstants } from '../util/web.constants';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  findAllPeoUsers(): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.LOOKUP.FIND_ALL_PEO_USERS;

    return this.ajaxHelper.get(url);
  }
}
