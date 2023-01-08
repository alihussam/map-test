import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
import { WebConstants } from 'src/app/util/web.constants';

@Component({
  selector: 'app-payment-session-dialog',
  templateUrl: './payment-session-dialog.component.html',
  styleUrls: ['./payment-session-dialog.component.scss']
})
export class PaymentSessionDialogComponent implements OnInit {
  public liveSessionObject: any = null;
  public spotPaymentList: any[] = [];

  constructor(public dialog: MatDialogRef<PaymentSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public mapService: MapService,
    public toastrService: ToastrService) {
    this.init(data);
  }

  ngOnInit(): void {
  }

  init(data: any): void {
    this.liveSessionObject = data;
    this.spotPaymentList = data.spotPaymentList;
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
