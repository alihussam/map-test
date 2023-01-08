import { Injectable } from "@angular/core";
import { WebConstants } from "./web.constants";

/**
 * @author Riaz Jaffary
 */

@Injectable()
export class TokenStorage {
  constructor() {}

  public clearAll(): void {
    localStorage.removeItem(WebConstants.USER.TOKEN);
    localStorage.removeItem(WebConstants.USER.ID);
    localStorage.removeItem(WebConstants.USER.LOGGED_IN);
    localStorage.removeItem(WebConstants.USER.AUTHORITIES);
  }

  public logOut(): void {
    this.flushAllUserStorage();
  }

  public flushAllUserStorage(): void {
    localStorage.removeItem(WebConstants.USER.TOKEN);
    localStorage.removeItem(WebConstants.USER.ID);
    localStorage.removeItem(WebConstants.USER.LOGGED_IN);
    localStorage.removeItem(WebConstants.USER.AUTHORITIES);
    localStorage.clear();
  }

  public saveDetails(key: string, value: string): void {
    localStorage.removeItem(key);
    localStorage.setItem(WebConstants.USER.LOGGED_IN, value);
  }

  public saveToken(token: string): void {
    localStorage.removeItem(WebConstants.USER.TOKEN);
    localStorage.setItem(WebConstants.USER.TOKEN, token);
  }

  public saveTokenObject(token: string): void {
    localStorage.removeItem(WebConstants.USER.TOKEN);
    localStorage.setItem(WebConstants.USER.TOKEN, token);
  }

  public saveAuthorities(pagePrivilege: string): void {
    localStorage.removeItem(WebConstants.USER.AUTHORITIES);
    localStorage.setItem(WebConstants.USER.AUTHORITIES, pagePrivilege);
  }

  public getLoggedInUser(): string {
    return localStorage.getItem(WebConstants.USER.LOGGED_IN);
  }

  public getUserId(): Number {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    return loggedInUserObject.id;
  }

  public getUser(): Number {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    return loggedInUserObject;
  }

  public getOrganizationId(): Number {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    console.log("Logged in user", loggedInUserObject);

    return loggedInUserObject.organizationId;
  }

  public getToken(): string {
    return localStorage.getItem(WebConstants.USER.TOKEN);
  }

  public getPages(): string {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    return loggedInUserObject.page;
  }

  public getMenuList(): any {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    return loggedInUserObject ? loggedInUserObject.menu : [];
  }

  public getRole(): any {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    return loggedInUserObject.role;
  }

  public getLoggedInUsername(): any {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    return loggedInUserObject.displayName;
  }

  public getByKey(key: string): string {
    return localStorage.getItem(key);
  }

  public isDefaultUser(): boolean {
    let loggedInUserObject = JSON.parse(this.getLoggedInUser());

    return loggedInUserObject.defaultUser;
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem(WebConstants.USER.TOKEN);
  }
}
