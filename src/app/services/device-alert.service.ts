import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { Observable } from 'rxjs';
import { WebConstants } from '../util/web.constants';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class DeviceAlertService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DEVICE_ALERT.FIND_ALL_DEVICE_ALERT);
  }

  addDeviceAlert(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.DEVICE_ALERT.ADD_DEVICE_ALERT, payload);
  }

  updateDeviceAlert(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.DEVICE_ALERT.UPDATE_DEVICE_ALERT, payload);
  }

  deleteDeviceAlert(deviceAlertId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DEVICE_ALERT.DELETE_DEVICE_ALERT + deviceAlertId);
  }

  getAllDeviceAlertByOrganizationId(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.DEVICE_ALERT.FIND_DEVICE_ALERT_BY_ORGANIZATION + organizationId);
  }
}
