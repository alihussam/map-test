import { Injectable } from '@angular/core';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  getParkingOccupancyTime(searchObject: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + "/api/excel/occupancy-time";

    return this.ajaxHelper.post(url, searchObject);
  }
}
