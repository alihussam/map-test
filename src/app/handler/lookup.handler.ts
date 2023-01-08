import { Injectable } from '@angular/core';
import { LookupService } from '../services/lookup.service';

/**
 * @author MSA
 */

@Injectable({
  providedIn: 'root'
})
export class LookupHandler {
  public objectList: any[] = [];

  constructor(public lookupService: LookupService) {
  }

  findAllPeoUsers(): void {
  }
}