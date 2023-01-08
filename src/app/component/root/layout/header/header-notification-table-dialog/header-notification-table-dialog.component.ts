import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-header-notification-table-dialog',
  templateUrl: './header-notification-table-dialog.component.html',
  styleUrls: ['./header-notification-table-dialog.component.scss']
})

export class HeaderNotificationTableDialogComponent implements OnInit {
  public notificationData: any[] = [];
  public notificationInfoDialogMethod: Function;
  public markAllasReadMethod: Function;

  // @Output('parentFun') parentFun: EventEmitter<any> = new EventEmitter();

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // public dataSource = new MatTableDataSource();
  // public displayedColumns: string[] = [
  //   'name',
  //   'emailAddress',
  //   'phoneNumber1',
  //   'address',
  //   'city',
  //   'state',
  //   'country',
  //   'status',
  //   'actions',
  // ];

  constructor(public dialog: MatDialogRef<HeaderNotificationTableDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.init(data);
  }

  ngOnInit(): void {
    // this.parentFun.emit();
  }

  init(data: any): void {
    this.notificationData = data.notificationList;
    this.notificationInfoDialogMethod = this.data.notificationInfoDialogMethod;
    this.markAllasReadMethod = this.data.markAllasReadMethod;
    console.log('data : {}', data);
  }

  closeDialog(): void {
    this.dialog.close();
  }

  getRelativeTime(deviceTimeInMillis: any): any {
    return moment(deviceTimeInMillis).fromNow();
  }

  getNotificationClass(isRead: any) {
    return !isRead ? 'dropdown-item box-content-unRead' : 'dropdown-item';
  }

  notificationInfoDialog(notification: any, isReadAll: boolean) {
    this.notificationInfoDialogMethod.call(this, notification, isReadAll);
    notification.isRead = true;
    const index = this.notificationData.findIndex((object) => object.id === notification.id);
    this.notificationData[index] = notification;
  }

  markAllAsRead() {
    this.markAllasReadMethod.call(this);
    this.notificationData.forEach(x => x.isRead = true);
  }
}
