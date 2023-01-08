import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-notification-info-dialog',
  templateUrl: './header-notification-info-dialog.component.html',
  styleUrls: ['./header-notification-info-dialog.component.scss']
})

export class HeaderNotificationInfoDialogComponent implements OnInit {
  public notificationData: any;
  public binSpotData: any;
  constructor(public dialog: MatDialogRef<HeaderNotificationInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router : Router,
              
              ) {
    this.init(data);
  }

  ngOnInit(): void {
  }

  init(data: any): void {
    this.notificationData = data.notificationInfoData;
    this.binSpotData = data.spotInfoData;

    console.log('data : {}', data);
  }

  closeDialog(): void {
    this.dialog.close();
    
    
  }
 

}
