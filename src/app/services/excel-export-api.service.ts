import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { Observable } from 'rxjs';
import { WebConstants } from '../util/web.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportApiService {

  public baseUrl:string = environment.BaseServiceUrl;
  
  constructor(public ajaxHelper: AjaxHelper) { }

  getParkingOccupancyCountExcel(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.EXCEL.FIND_OCCUPANCY_COUNT;
    
    return this.ajaxHelper.post(url, object);
  }

  getParkingOccupancyHourExcel(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.EXCEL.FIND_OCCUPANCY_HOUR;
    
    return this.ajaxHelper.post(url, object);
  }

  getParkingOccupancyTimeCountExcel(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.EXCEL.FIND_OCCUPANCY_TIME_COUNT;
    
    return this.ajaxHelper.post(url, object);
  }

  getPeoActionExcel(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.EXCEL.FIND_PEO_ACTION;
    
    return this.ajaxHelper.post(url, object);
  }

  getTicketIssued(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.EXCEL.FIND_DAILY_TICKET_ISSUED;
    
    return this.ajaxHelper.post(url, object);
  }

  getActionNotTakenExcel(object: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + WebConstants.API_URL.EXCEL.FIND_ACTION_NOT_TAKEN_DETAIL;
    
    return this.ajaxHelper.post(url, object);
  }
  
}
