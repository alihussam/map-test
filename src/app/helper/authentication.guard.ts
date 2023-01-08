import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

import { AuthenticationService } from '../services/authentication.service';
import { TokenStorage } from '../util/token.storage';
import { WebConstants } from '../util/web.constants';
import {Observable} from 'rxjs';

/**
 * @author Riaz Jaffary
 */

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

  public baseUrl: string = environment.BaseServiceUrl;
  constructor(public location: Location,public router: Router,public tokenStorage: TokenStorage,
    public authenticationService: AuthenticationService) {
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const currentUser = this.authenticationService.currentUserValue;

  //   //console.log("currentUser={}, url={}", currentUser, state.url);

  //   if (currentUser) {
  //     // authorised so return true      
  //     return true;
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.UserCredentialsError(state);  
  //   return false;
  // }


//

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  let url: string = state.url;
  return this.checkUserLogin(next, url);
}

canActivateChild(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.canActivate(next, state);
}

checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
  const currentUser = this.authenticationService.currentUserValue;
  if (currentUser) {
    const userRole = this.tokenStorage.getRole();
    if (route.data.role && route.data.role.indexOf(userRole) === -1) {
      this.router.navigate(['/access-denied'],{ skipLocationChange: true });
      this.location.replaceState('/');
      return false;
    }
    return true;
  }

  this.router.navigate([WebConstants.WEB_URL.LOGIN],{ skipLocationChange: true });
  this.location.replaceState('/');
  return false;
}

  UserCredentialsError(state){
    this.authenticationService.logout();
    this.router.navigate([WebConstants.WEB_URL.LOGIN]);
  }
}
