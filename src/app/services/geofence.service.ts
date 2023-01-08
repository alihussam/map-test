 import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import {  environment } from '../../environments/environment';
import { WebConstants } from '../util/web.constants';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {

  public baseUrl:string = environment.BaseServiceUrl;

  constructor(private ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.GEOFENCE.FIND_ALL_GEOFENCE);
  }

  addGeofence(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.GEOFENCE.ADD_GEOFENCE, payload);
  }

  updateGeofence(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.GEOFENCE.UPDATE_GEOFENCE, payload);
  }

  deleteGeofence(geofenceId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.GEOFENCE.DELETE_GEOFENCE + geofenceId);
  }
  
  findGeofenceByOrganizationId(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.GEOFENCE.FIND_GEOFENCE_BY_ORGANIZATION + organizationId);
  }
  
  // getAllGeofenceCount(): Observable<BaseResponse<any>> {
  //   return this.ajaxHelper.get(""+environment.BaseServiceUrl+"/Geofence/GetGeofenceData");
  // }


}
