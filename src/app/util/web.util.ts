import { Injectable } from "@angular/core";
import { TokenStorage } from "./token.storage";
import { WebConstants } from "./web.constants";

/**
 * @author MSA
 */

@Injectable()
export class WebUtil {
  constructor(public tokenStorage: TokenStorage) {}

  isSuperAdmin(): boolean {
    return this.tokenStorage.getRole() === WebConstants.USER_ROLE.SUPER_ADMIN
      ? true
      : false;
  }

  isAdmin(): boolean {
    return this.tokenStorage.getRole() === WebConstants.USER_ROLE.ADMIN
      ? true
      : false;
  }

  isManager(): boolean {
    return this.tokenStorage.getRole() === WebConstants.USER_ROLE.MANAGER
      ? true
      : false;
  }

  isUser(): boolean {
    return this.tokenStorage.getRole() !== WebConstants.USER_ROLE.SUPER_ADMIN ||
      this.tokenStorage.getRole() !== WebConstants.USER_ROLE.ADMIN ||
      this.tokenStorage.getRole() !== WebConstants.USER_ROLE.MANAGER
      ? true : false;
  }
}

export function getStatusCode(checked: boolean): Number {
  return checked ? WebConstants.STATUS.CODE.ACTIVE : WebConstants.STATUS.CODE.INACTIVE;
}

export function getStatusMessage(status: string): Number {
  return status === WebConstants.STATUS.MSG.ACTIVE ? WebConstants.STATUS.CODE.ACTIVE
  : WebConstants.STATUS.CODE.INACTIVE;
}

export function isStatusMessage(status: string): boolean {
  return status === WebConstants.STATUS.MSG.ACTIVE ? true : false;
}

export function getStatusList(): any {
  let statusList = [];

  statusList.push({ id: 1, name: WebConstants.STATUS.MSG.ACTIVE });
  statusList.push({ id: 2, name: WebConstants.STATUS.MSG.INACTIVE });

  return statusList;
}

export function listToCommaSeparatedString(dataList: any[]): string {
  let strValue = "";

  if (dataList.length > 0) {
    for (let i = 0; i < dataList.length; i++) {
      let dataObject = dataList[i].name;

      if (i === 0) {
        strValue = dataObject;
      } else {
        strValue += "," + dataObject;
      }
    }
  }

  return strValue;
}

export function timeConvertByMinutes(minutes: number): String {
  let days = (minutes / 1440) | 0;
  let hours = ((minutes % 1440) / 60) | 0;
  let mins = minutes % 60;
  return days + " days " + hours + " hr " + mins + " min";
}

export function convertMillimeterToInches(value: number): any {
  const result = (value / 25.4).toFixed(2);
  return result + ' Inches';
}

export function dropDownSettings(
  id: String,
  name: String,
  selectText: String,
  unSelectText: String,
  itemsShowLimit: Number,
  allowFilter: boolean,
  limitSelection: Number
): any {
  let dropDownSettingObject = null;

  if (limitSelection > 0) {
    dropDownSettingObject = {
      singleSelection: false,
      idField: id,
      textField: name,
      selectAllText: selectText,
      unSelectAllText: unSelectText,
      itemsShowLimit: itemsShowLimit,
      allowSearchFilter: allowFilter,
      limitSelection: limitSelection,
    };
  } else {
    dropDownSettingObject = {
      singleSelection: false,
      idField: id,
      textField: name,
      selectAllText: selectText,
      unSelectAllText: unSelectText,
      itemsShowLimit: itemsShowLimit,
      allowSearchFilter: allowFilter,
    };
  }

  return dropDownSettingObject;
}
