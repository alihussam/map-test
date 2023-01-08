import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { TokenStorage } from "src/app/util/token.storage";
import { WebConstants } from "src/app/util/web.constants";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AuthenticationService } from "src/app/services/authentication.service";
import { BinWiseNotificationService } from "src/app/services/binwise.notification.service";
import { first } from "rxjs/operators";
import { WebSocketConfiguration } from "../../../../websocket/websocket.configuration";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment-timezone";
import { MatDialog } from "@angular/material";
import { HeaderNotificationInfoDialogComponent } from "./header-notification-Info-dialog/header-notification-info-dialog.component";
import { ParkingSpotService } from "../../../../services/parking-spot.service";
import { HeaderNotificationTableDialogComponent } from "./header-notification-table-dialog/header-notification-table-dialog.component";

declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public menuList: any = [];
  public loggedInUser: any = {};
  public messageHandlerCallback: Function;
  public notificationUnReadCount = 0;
  public notificationTop5List: any[] = [];
  public notificationList: any[] = [];
  public binSpotInfoList: any[] = [];
  public notificationInfoDialogCallBack: Function;
  public markAllasReadCallBack: Function;
  public intervalId: any;

  constructor(
    public tokenStorage: TokenStorage,
    public router: Router,
    public location: Location,
    public matDialog: MatDialog,
    public authenticationService: AuthenticationService,
    private webSocketConfiguration: WebSocketConfiguration,
    public notificationService: BinWiseNotificationService,
    public spotService: ParkingSpotService,
    public toastrService: ToastrService
  ) {
    this.loggedInUser = this.tokenStorage.getUser();
  }

  ngOnInit(): void {
    this.updateMenu();
    //this.createWebSocketConnections();
    this.loadBinWiseNotification();
    this.loadBinSpots();
    // this.menuOptions();
    // console.log("MenuList ", this.menuList);
    this.intervalId = setInterval(() => {
      this.loadBinWiseNotification();
    }, 10000);
  }

  // menuOptions() {
  //   $(document).ready(function () {
  //     $("#menu-btn").click(function () {
  //       $("#menu").toggle();
  //       $("#menu").addClass("sh");
  //     });

  //     $("#menu a").click(function () {
  //       $(".sh").hide();
  //     });
  //   });
  // }

  signout() {
    clearInterval(this.intervalId);
    this.authenticationService.logout();
    this.tokenStorage.clearAll();
    this.router.navigate([WebConstants.WEB_URL.HOME]);
  }

  userProfile() {
    this.router.navigate([WebConstants.WEB_URL.USER_PROFILE]);
  }

  updateMenu() {
    const menu = this.tokenStorage.getMenuList();

    console.log("Menu found", menu);

    this.menuList = menu || [];
  }

  createWebSocketConnections(): void {
    this.messageHandlerCallback = this.messageHandler.bind(this);
    const topics = [WebConstants.WEB_SOCKET.TOPIC.BINWISE_NOTIFICATION];

    this.webSocketConfiguration.createWebSocketConnection(
      WebConstants.WEB_SOCKET.ENDPOINT.WEB_NOTIFICATION,
      topics,
      this.messageHandlerCallback
    );
  }

  messageHandler(payload: any): void {
    const data = JSON.parse(JSON.parse(payload.body));
    if (data != null) {
      this.loadBinWiseNotification();
    }
  }

  private loadBinWiseNotification() {
    this.notificationService
      .getAllNotification()
      .pipe(first())
      .subscribe((response) => {
        // console.log('notification response : {}' , response);
        this.updateNotificationData(response);
      });
  }

  private updateNotificationData(response: any) {
    if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
      this.notificationList = response.data;
      this.notificationTop5List = this.notificationList.slice(0, 5);
      this.notificationUnReadCount = this.getUnReadCount();
    } else {
      this.toastrService.error(
        "Some Error Occurred while Fetching Notification, Reason: {} ",
        response.message
      );
    }
  }

  private getUnReadCount() {
    let resultCount = 0;
    if (this.notificationList != null && this.notificationList.length > 0) {
      resultCount = this.notificationList.filter(
        (object) => object.isRead === false
      ).length;
    }
    return resultCount;
  }

  markAsRead(notification: any) {
    if (!notification.isRead) {
      this.notificationService
        .markAsRead(notification.id)
        .pipe(first())
        .subscribe((response) => {
          this.loadBinWiseNotification();
        });
    }
  }

  markAllAsRead() {
    this.notificationService
      .markAllAsRead()
      .pipe(first())
      .subscribe((response) => {
        this.loadBinWiseNotification();
      });
  }

  getRelativeTime(deviceTimeInMillis: any): any {
    return moment(deviceTimeInMillis).fromNow();
  }

  getNotificationClass(isRead: any) {
    return !isRead ? "dropdown-item box-content-unRead" : "dropdown-item";
  }

  notificationInfoDialog(object: any, isReadAll: boolean): void {
    this.markAsRead(object);
    const binSpotInfo = this.binSpotInfoList.filter(
      (x) => x.devEui === object.devEUI
    );

    if (!isReadAll) this.matDialog.closeAll();

    const dialog = this.matDialog.open(HeaderNotificationInfoDialogComponent, {
      width: "600px",
      data: { notificationInfoData: object, spotInfoData: binSpotInfo[0] },
    });

    this.router.events.subscribe(() => {
      dialog.close();
    });

    dialog.afterClosed().subscribe((result) => {
      this.router.events.subscribe(() => {
        dialog.close();
      });
    });
    // this.router.events
    //   .subscribe(() => {
    //     dialog.close();
    //   });
  }

  private loadBinSpots() {
    this.spotService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.binSpotInfoList = response.data;
        }
      });
  }

  notificationTableDialog() {
    this.notificationInfoDialogCallBack =
      this.notificationInfoDialog.bind(this);
    this.markAllasReadCallBack = this.markAllAsRead.bind(this);
    // this.matDialog.closeAll();
    const dialog = this.matDialog.open(HeaderNotificationTableDialogComponent, {
      width: "50%",
      data: {
        notificationList: this.notificationList,
        notificationInfoDialogMethod: this.notificationInfoDialogCallBack,
        markAllasReadMethod: this.markAllasReadCallBack,
      },
    });

    this.router.events.subscribe(() => {
      dialog.close();
    });

    dialog.afterClosed().subscribe((result) => {
      this.router.events.subscribe(() => {
        dialog.close();
      });
    });

    // this.router.events
    //   .subscribe(() => {
    //     dialog.close();
    //   });
  }

  ngOnDestroy(): void {
    // console.log("header interval cleared")
    clearInterval(this.intervalId);
  }
}
