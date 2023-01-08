import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjaxHelper } from '../helper/ajax.helper';
import { BaseResponse } from '../model/base.response';
import {  environment } from '../../environments/environment';

 /**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class SensorslocationService {
  
  public baseUrl:string = environment.BaseServiceUrl;

  constructor(private ajaxHelper: AjaxHelper) { }


  getAllParkingSensors(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + "/ParkingSpot/GetParkingSensors");
  }


}
