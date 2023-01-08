import { Component } from "@angular/core";
import { Router, ActivatedRoute, RouterEvent, Event,NavigationStart } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { TokenStorage } from "./util/token.storage";
import { MatDialog } from "@angular/material";
import { filter, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "BinwiseAngular";
  resetToken: any;
  

  constructor(public router: Router, public matDialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public tokenStorage: TokenStorage,private ngxService: NgxUiLoaderService) {


      router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        tap(() => this.matDialog.closeAll())
      ).subscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((querParams) => {
      this.resetToken = querParams["params"].resettoken;
    });
  }
}
