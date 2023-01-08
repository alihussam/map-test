import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avg-time-to-full-map',
  templateUrl: './avg-time-to-full.component.html',
  styleUrls: ['./avg-time-to-full.component.scss']
})
export class AvgTimeToFullComponent implements OnInit {
  public url: string = "https://bi-binwise-dev.conurets.com/";
  public urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}