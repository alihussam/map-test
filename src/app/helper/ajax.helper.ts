import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse} from '../model/base.response';
import { environment } from 'src/environments/environment';

/**
 * @author ABBAS
 */

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

@Injectable({providedIn: 'root'})
export class AjaxHelper {
 
  //baseUrl:string = environment.BaseServiceUrl;

  constructor(private httpClient: HttpClient) {
  }

  public login(url: string, payload: Object): Observable<BaseResponse<any>> {
    //console.log("payload={}", payload);
   
    //url = this.baseUrl + url;
  
    return this.httpClient.post<BaseResponse<any>>(url, JSON.stringify(payload));    
  }

  public get(url: string): Observable<BaseResponse<any>> {
    //console.log("get.url={}", url);

    //url = this.baseUrl + url;
    
    return this.httpClient.get<BaseResponse<any>>(url);
  }

  public post(url: string, payload: Object): Observable<BaseResponse<any>> {
    //console.log("post.url={}, payload={}", url, payload);

    //url = this.baseUrl + url;

    return this.httpClient.post<BaseResponse<any>>(url, JSON.stringify(payload));
  }

  public put(url: string, payload: Object): Observable<BaseResponse<any>> {
    //console.log("post.url={}, payload={}", url, payload);

    //url = this.baseUrl + url;

    return this.httpClient.put<BaseResponse<any>>(url, JSON.stringify(payload));
  }
}
