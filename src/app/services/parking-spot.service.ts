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
export class ParkingSpotService {

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  getAll(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.FIND_ALL_PARKING_SPOT);
  }

  addParkingSpot(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.ADD_PARKING_SPOT, payload);
  }

  updateParkingSpot(payload: any): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.UPDATE_PARKING_SPOT, payload);
  }

  deleteParkingSpot(parkingSpotId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.DELETE_PARKING_SPOT + parkingSpotId);
  }

  findParkingSpotById(parkingSpotId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.FIND_PARKING_SPOT_BY_ID + parkingSpotId);
  }

  getAllParkingSpotByDealerId(dealerId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.FIND_ALL_PARKING_SPOT_BY_DEALER_ID + dealerId);
  }

  findParkingSpotByOrganizationId(organizationId: Number): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.FIND_PARKING_SPOT_BY_ORGANIZATION + organizationId);
  }

  findParkingSpotByDevEUI(devEUI: string): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PARKING_SPOT.FIND_PARKING_SPOT_BY_DEVEUI + devEUI);
  }
}
