import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { environment } from '../../environments/environment';
import { WebConstants } from '../util/web.constants';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(private ajaxHelper: AjaxHelper) {
  }

  getAllParkingSpots(): Observable<BaseResponse<any>>{
    let url = environment.BaseServiceUrl + WebConstants.API_URL.PARKING_SPOT.FIND_ALL_PARKING_SPOT;
    return this.ajaxHelper.get(url);
  }

  getSingleParkingSpotByDevEui(devEui : string ): Observable<BaseResponse<any>>{
    let url = environment.BaseServiceUrl + WebConstants.API_URL.MAP.FIND_SINGLE_PARKING_SPOT_BY_DEVEUI + devEui;
    return this.ajaxHelper.get(url);
  }

  getCurrentSessions(): Observable<BaseResponse<any>>{
    let url = this.baseUrl + WebConstants.API_URL.MAP.FIND_CURRENT_SESSIONS;

    return this.ajaxHelper.get(url);
  }

  getPastSessions(object: any): Observable<BaseResponse<any>>{
    let url = this.baseUrl + WebConstants.API_URL.MAP.FIND_EXPIRED_SESSIONS;

    return this.ajaxHelper.post(url , object);
  }

  getLiveSessions(): Observable<BaseResponse<any>>{
    let url = this.baseUrl + WebConstants.API_URL.MAP.FIND_LIVE_SESSIONS;

    return this.ajaxHelper.get(url);
  }

  getTodaySessions(): Observable<BaseResponse<any>>{
    let url = this.baseUrl + WebConstants.API_URL.MAP.FIND_TODAY_SESSIONS;

    return this.ajaxHelper.get(url);
  }

  saveSessionExpiredAction(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + "/api/map/save-session-expired-action";

    return this.ajaxHelper.post(url, object);
  }

  updateSessionExpiredAction(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + "/api/map/update-session-expired-action";

    return this.ajaxHelper.post(url, object);
  }
}