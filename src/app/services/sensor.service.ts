import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { WebConstants } from '../util/web.constants';
import { BaseResponse } from '../model/base.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.SENSOR.FIND_ALL_SENSOR);
  }

  addSensor(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.SENSOR.ADD_SENSOR, payload);
  }

  updateSensor(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.SENSOR.UPDATE_SENSOR, payload);
  }

  deleteSensor(deleteId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.SENSOR.DELETE_SENSOR + deleteId);
  }

  getAllSensorType(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.SENSOR.FIND_ALL_SENSOR_TYPE);
  }

  getAllSensorByDeviceId(deviceId): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.SENSOR.FIND_ALL_SENSOR_BY_DEVICE_ID + deviceId);
  }
}
