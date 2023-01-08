import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';


import { BinTypeRoutingModule } from './bin-type-routing.module';
import { BinTypeComponent } from './bin-type.component';
import { BinTypeAddComponent } from './bin-type-add/bin-type-add.component';
import { BinTypeUpdateComponent } from './bin-type-update/bin-type-update.component';


@NgModule({
  declarations: [BinTypeComponent, BinTypeAddComponent, BinTypeUpdateComponent],
  imports: [
    CommonModule,
    CommonConfigModule,
    BinTypeRoutingModule
  ]
})
export class BinTypeModule { }
