import { Component, OnInit } from "@angular/core";
import * as Chart from "chart.js";
import { WebConstants } from "src/app/util/web.constants";
import { first } from "rxjs/operators";

import { BinWiseNotificationService } from "src/app/services/binwise.notification.service";
import { MapService } from "src/app/services/map.service";
import { ParkingSpotService } from "src/app/services/parking-spot.service";
import { TokenStorage } from "src/app/util/token.storage";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  public data: any;
  totalcount: any;
  public currentTab: string = WebConstants.MAP_TAB.CURRENT_SESSION;
  public currentTab2: string = WebConstants.MAP_TAB.PAST_SESSION;

  public currentExpiredSessionObjects: any[] = [];
  count: any;
  fullBinCount: any[];
  fullBinCountlength: number;
  halfFullBinCount: any[];
  halfFullBinCountlength: number;
  emptyBinCount: any[];
  emptyBinCountlength: number;
  totalAlert: any;
  public notificationData: any = [];
  fireAlertCount: any[];
  fireAlertCountlength: number;
  fallenAlertCount: any[];
  fallenAlertCountlength: number;
  fire_fallenAlertCount: any[];
  fire_fallenAlertCountlength: number;
  parkingSpots: any;
  activeStatus: any;
  inactiveStatus: any;
  TCPType: any;
  LoRaWANType: any;

  constructor(
    public notificationService: BinWiseNotificationService,
    public mapService: MapService,
    public parkingSpotService: ParkingSpotService,
    public tokenStorage: TokenStorage
  ) { }

  ngOnInit(): void {
    this.loadBinWiseAlerts();
    this.getAllBinStatus();
  }

  getAllBinStatus() {
    this.parkingSpotService
      .findParkingSpotByOrganizationId(this.tokenStorage.getOrganizationId())
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.parkingSpots = response.data;

          this.activeStatus = this.parkingSpots.filter(
            (b) => b.status === "Active"
          );

          this.inactiveStatus = this.parkingSpots.filter(
            (p) => p.status === "Inactive"
          );

          this.TCPType = this.parkingSpots.filter(
            (b) => b.sensorType === "TCP"
          );

          this.LoRaWANType = this.parkingSpots.filter(
            (p) => p.sensorType === "LoRaWAN"
          );

          this.StatusChart();
          this.sensorTypeChart();
        }
      });
  }

  getCurrentSessions(): void {
    this.currentTab = WebConstants.MAP_TAB.CURRENT_SESSION;
    this.mapService
      .getCurrentSessions()
      .pipe(first())
      .subscribe((response) => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data.length > WebConstants.INT_ZERO) {
            this.currentExpiredSessionObjects = response.data;
            this.halfFullBinCount = this.currentExpiredSessionObjects.filter(
              (x) => x.trashCanStatus === "HALF_FULL"
            );
            this.halfFullBinCountlength = this.halfFullBinCount.length;

            this.emptyBinCount = this.currentExpiredSessionObjects.filter(
              (x) => x.trashCanStatus === "EMPTY"
            );
            this.emptyBinCountlength = this.emptyBinCount.length;

            this.fullBinCount = this.currentExpiredSessionObjects.filter(
              (x) => x.trashCanStatus === "FULL"
            );
            this.fullBinCountlength = this.fullBinCount.length;

            this.binStatusChart();
          }
        }
      });
  }

  private loadBinWiseAlerts() {
    this.notificationService
      .getAllNotification()
      .pipe(first())
      .subscribe((response) => {
        this.totalcount = response.data.length;
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data.length > WebConstants.INT_ZERO) {
            this.totalAlert = response.data;

            this.fireAlertCount = this.totalAlert.filter(
              (x) => x.text === "Fire"
            );
            this.fireAlertCountlength = this.fireAlertCount.length;

            this.fallenAlertCount = this.totalAlert.filter(
              (x) => x.text === "Fallen"
            );
            this.fallenAlertCountlength = this.fallenAlertCount.length;

            this.fire_fallenAlertCount = this.totalAlert.filter(
              (x) => x.text === "Fire + Fallen"
            );
            this.fire_fallenAlertCountlength =
              this.fire_fallenAlertCount.length;

            this.getCurrentSessions();
            this.alertChart();
          }
        }
      });
  }

  ////////////CHARTS//////////
  binStatusChart() {
    this.canvas = document.getElementById("binStatusChart");
    this.ctx = this.canvas.getContext("2d");

    const binStatusChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: ["FULL BINS", "PARTIAL FULL BINS", "EMPTY BINS"],
        datasets: [
          {
            label: "current sessions",
            data: [
              this.fullBinCount.length,
              this.halfFullBinCount.length,
              this.emptyBinCount.length,
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 1)",
              "rgb(170, 255, 0)",
              "rgb(255, 165, 0)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        display: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  alertChart() {
    this.canvas = document.getElementById("alertChart");
    this.ctx = this.canvas.getContext("2d");
    const alertChart = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: ["Fire", "Fallen", "Fire + Fallen"],
        datasets: [
          {
            label: "Members",
            data: [
              this.fireAlertCount.length,
              this.fallenAlertCount.length,
              this.fire_fallenAlertCount.length,
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 1)",
              "rgb(170, 255, 0)",
              "rgb(255, 165, 0)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        display: true,
      },
    });
  }

  StatusChart() {
    this.canvas = document.getElementById("statusChart");
    this.ctx = this.canvas.getContext("2d");
    const statusChart = new Chart(this.ctx, {
      type: "polarArea",
      data: {
        labels: ["Active", "Inactive"],
        datasets: [
          {
            label: "Members",
            data: [this.activeStatus.length, this.inactiveStatus.length],
            backgroundColor: ["rgba(54, 162, 235, 1)", "rgb(170, 255, 0)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        display: true,
      },
    });
  }

  sensorTypeChart() {
    this.canvas = document.getElementById("sensorTypeChart");
    this.ctx = this.canvas.getContext("2d");
    const sensorTypeChart = new Chart(this.ctx, {
      type: "doughnut",
      data: {
        labels: ["TCP Type", "LoRaWAN Type"],
        datasets: [
          {
            label: "Members",
            data: [this.TCPType.length, this.LoRaWANType.length],
            backgroundColor: ["rgba(54, 162, 235, 1)", "rgb(170, 255, 0)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        display: true,
      },
    });
  }
}