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
export class GeofenceDetailService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(private ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>>{
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.GEOFENCE_DETAIL.FIND_ALL_GEOFENCE_DETAIL);
  }

  addGeofenceDetail(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.GEOFENCE_DETAIL.ADD_GEOFENCE_DETAIL, payload);
  }

  updateGeofenceDetail(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.GEOFENCE_DETAIL.UPDATE_GEOFENCE_DETAIL, payload);
  }

  deleteGeofenceDetail(geofenceDetailId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.GEOFENCE_DETAIL.DELETE_GEOFENCE_DETAIL + geofenceDetailId);
  }

  GeofenceDetailFindByGeofenceId(geofenceId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.GEOFENCE_DETAIL.GEOFENCE_DETAIL_FIND_BY_GEOFENCE_ID + geofenceId);
  }
}
