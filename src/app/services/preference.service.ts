import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { WebConstants } from '../util/web.constants';
import { BaseResponse } from '../model/base.response';
import { AjaxHelper } from '../helper/ajax.helper';
import { environment } from 'src/environments/environment';

/**
 * @author RIAZ JAFFARY
 */

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  public baseUrl: string = environment.BaseServiceUrl;

  constructor(public ajaxHelper: AjaxHelper) { }

  getAllPreferences(): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PREFERENCES.FIND_ALL_PREFERENCES);
  }

  addPreferences(payload): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.PREFERENCES.ADD_PREFERENCES, payload);
  }

  updatePreference(payload): Observable<BaseResponse<any>> {
    return this.ajaxHelper.post(this.baseUrl + WebConstants.API_URL.PREFERENCES.UPDATE_PREFERENCES, payload);
  }

  deletePreference(preferenceId): Observable<BaseResponse<any>> {
    return this.ajaxHelper.get(this.baseUrl + WebConstants.API_URL.PREFERENCES.DELETE_PREFERENCES + preferenceId);
  }
}
