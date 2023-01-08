import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from 'agm-overlays';
import { CommonConfigModule } from 'src/app/shared-modules/commonConfig.module';
import { WebSocketConfiguration } from 'src/app/websocket/websocket.configuration';
import { MapViewComponent } from './map-view/map-view.component';
//import { HistoryMapComponent } from './history-map/history-map.component';
// import { AgmDrawingModule } from '@agm/drawing';
import { AgmDirectionModule } from 'agm-direction';
import { SessionExpiredDialogComponent } from './session-expired-dialog/session-expired-dialog.component';
import { DatePipe } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CurrentExpiredSessionDialogComponent } from './current-expired-session-dialog/current-expired-session-dialog.component';
import { PastExpiredSessionDialogComponent } from './past-expired-session-dialog/past-expired-session-dialog.component';
import { PaymentSessionDialogComponent } from './payment-session-dialog/payment-session-dialog.component';

@NgModule({
  declarations: [
    MapComponent,
    MapViewComponent,
    SessionExpiredDialogComponent,
    CurrentExpiredSessionDialogComponent,
    PastExpiredSessionDialogComponent,
    PaymentSessionDialogComponent,
    //HistoryMapComponent,
  ],
  imports: [
    MapRoutingModule,
    AgmOverlays,
    // AgmDrawingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0arKVAjPt4_nRYVTU2IzzmK2-jcSz594',
      libraries: ['places'],
      // libraries: ['drawing'],
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    }),
    NgMultiSelectDropDownModule.forRoot(),
    AgmDirectionModule,
    CommonConfigModule,
    NzDatePickerModule
  ],
  providers: [
    WebSocketConfiguration,
    DatePipe
  ]
})
export class MapModule { }
