import { NgModule } from '@angular/core';
import { GeofenceDetailAddComponent } from './geofence-detail-add/geofence-detail-add.component';
import { GeofenceDetailUpdateDialogComponent } from './geofence-detail/geofence-detail-update-dialog/geofence-detail-update-dialog.component';
import { GeofenceDetailAddDialogComponent } from './geofence-detail/geofence-detail-add-dialog/geofence-detail-add-dialog.component';
import { GeofenceDetailComponent } from './geofence-detail/geofence-detail.component';
import { GeofenceFileUploaderComponent } from './geofence-file-uploader/geofence-file-uploader.component';
import { GeofenceUpdateDialogComponent } from './geofence-update-dialog/geofence-update-dialog.component';
import { GeofenceAddDialogComponent } from './geofence-add-dialog/geofence-add-dialog.component';
import { GeofenceComponent } from './geofence.component';
import { GeofenceRoutingModule } from './geofence-routing.module';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';

@NgModule({
  declarations: [
    GeofenceComponent,
    GeofenceAddDialogComponent,
    GeofenceUpdateDialogComponent,
    GeofenceFileUploaderComponent,
    GeofenceDetailComponent,
    GeofenceDetailAddDialogComponent,
    GeofenceDetailUpdateDialogComponent,
    GeofenceDetailAddComponent,
  ],
  imports: [
    GeofenceRoutingModule,
    CommonConfigModule,
  ]
})
export class GeofenceModule { }
