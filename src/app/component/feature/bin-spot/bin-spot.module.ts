import { NgModule } from '@angular/core';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { BinSpotAddComponent } from './bin-spot-add/bin-spot-add.component';
import { BinSpotFileUploaderComponent } from './bin-spot-file-uploader/bin-spot-file-uploader.component';
import { BinSpotRoutingModule } from './bin-spot-routing.module';
import { BinSpotUpdateComponent } from './bin-spot-update/bin-spot-update.component';
import { BinSpotComponent } from './bin-spot.component';

@NgModule({
  declarations: [
    BinSpotComponent,
    BinSpotAddComponent,
    BinSpotUpdateComponent,
    BinSpotFileUploaderComponent,
  ],
  imports: [
    BinSpotRoutingModule,
    CommonConfigModule,
  ],
})
export class BinSpotModule { }
