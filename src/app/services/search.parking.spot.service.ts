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
export class SearchParkingSpotService {

  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  searchParkingSpot(searchObject: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + "/api/parking-spot-detail/search";

    return this.ajaxHelper.post(url, searchObject);
  }

  searchParkingSpotDetail(searchObject: any): Observable<BaseResponse<any>> {
    let url = this.baseUrl + "/api/parking-spot-detail/find-spot-action-image-detail";

    return this.ajaxHelper.post(url, searchObject);
  }
}
