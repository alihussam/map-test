import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { BinSpotColorRoutingModule } from './bin-spot-color-routing.module';
import { BinSpotColorComponent } from './bin-spot-color.component';
import { BinSpotColorAddComponent } from './bin-spot-color-add/bin-spot-color-add.component';
import { BinSpotColorUpdateComponent } from './bin-spot-color-update/bin-spot-color-update.component';

@NgModule({
  declarations: [BinSpotColorComponent, BinSpotColorAddComponent, BinSpotColorUpdateComponent],
  imports: [
    CommonConfigModule,
    BinSpotColorRoutingModule
  ]
})
export class BinSpotColorModule { }
