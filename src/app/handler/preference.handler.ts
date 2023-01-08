import { Injectable } from '@angular/core';
import { PreferenceService } from '../services/preference.service';
import { WebConstants } from '../util/web.constants';
import { first } from 'rxjs/operators';

/**
 * @author MSA
 */

@Injectable({
  providedIn: 'root'
})
export class PreferenceHandler {
  constructor(public preferenceService: PreferenceService) {
  }

  findAllPreference(): any[] {
    let preferenceList: any[] = [];

    this.preferenceService.getAllPreferences()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          preferenceList = response.data;
        }
      });

    return preferenceList;
  }
}