import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinTypeComponent } from './bin-type.component';

const routes: Routes = [{ path: '', component: BinTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BinTypeRoutingModule { }
