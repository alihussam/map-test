import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { environment } from '../../environments/environment';
import { WebConstants } from '../util/web.constants';

/**
 * @author SalmanWagh
 */

@Injectable({
  providedIn: 'root'
})
export class BinWiseNotificationService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(private ajaxHelper: AjaxHelper) {
  }

  getAllNotification(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(environment.BaseServiceUrl + WebConstants.API_URL.NOTIFICATION.FIND_ALL_ACTIVE);
  }

  markAsRead(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(environment.BaseServiceUrl + WebConstants.API_URL.NOTIFICATION.MARK_AS_READ + '/' + payload, null);
  }

  markAllAsRead(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(environment.BaseServiceUrl + WebConstants.API_URL.NOTIFICATION.MARK_ALL_AS_READ, null);
  }
}
