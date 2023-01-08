import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinSpotColorComponent } from './bin-spot-color.component';

const routes: Routes = [{ path: '', component: BinSpotColorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BinSpotColorRoutingModule { }
