import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import { WebConstants } from "../util/web.constants";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

/**
 * @author RIAZ JAFFARY
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public authenticationService: AuthenticationService,
    public toastrService: ToastrService,
    public router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e) => {
        //console.log("code={}, value={}: " + e.error.code, e.error.value);
        let error = null;

        if (e.status === WebConstants.STATUS.CODE_SUCCESS) {
          error = e.error.value || e.statusText;
          this.toastrService.error("Server is down", "Request Failed");
        } else if (e.status === 200) {
          if (e.error.code > WebConstants.STATUS.CODE_SUCCESS) {
            error = e.error.value || e.statusText;
          }
        } else if (e.status === 401) {
          this.toastrService.error(
            "Please Login Again",
            "Unauthorized User(401)"
          );
          this.logout();
        } else if (e.status === 404) {
          //close by amk
          //   if (e.error.code > WebConstants.STATUS.CODE_SUCCESS) {
          //   error = e.error.value || e.statusText;//it throw JWT time scew error
          //////////////////
          //     if (e.error.code === 913) {
          //       this.toastrService.error("Please Login", "Token Expired");
          //       this.logout();
          //     }
          //  }
          if (e.error.code > WebConstants.STATUS.CODE_SUCCESS) {
            //close by amk
            //error = e.error.value || e.statusText;//it throw JWT time scew error

            if (e.error.code === 404) {
              this.toastrService.error(error, "Error");
              this.logout();
            } else if (e.error.code === 901) {
              this.toastrService.error("Invalid Token", "Please Login Again");
              this.logout();
            } else if (e.error.code === 911) {
              this.toastrService.error(
                "Token Invalid Signature",
                "Please Login Again"
              );
              this.logout();
            } else if (e.error.code === 912) {
              this.toastrService.error("Token Malformed", "Please Login Again");
              this.logout();
            } else if (e.error.code === 913) {
              this.toastrService.error("Token Expired", "Please Login Again");
              this.logout();
            } else if (e.error.code === 914) {
              this.toastrService.error(
                "Token Unsupported",
                "Please Login Again"
              );
              this.logout();
            } else if (e.error.code === 915) {
              this.toastrService.error(
                "Token Illegal Argument",
                "Please Login Again"
              );
              this.logout();
            } else if (e.error.code === 201) {
              this.toastrService.error(
                "Enter email and password correctly",
                "Incorrect User Credentials"
              );
            } else if (
              e.error.code === 301 &&
              e.error.value === "no user found"
            ) {
              this.toastrService.error(
                "Enter email and password correctly",
                "Incorrect User Credentials"
              );
            } else if (e.error.code === 305) {
              this.toastrService.error("User Inactive", "Invalid access");
              this.logout();
            }
            
            else if (
              e.error.code === 100 &&
              e.error.value === "Organization of this user is inactive"
            ) {
              this.toastrService.error(
                "Organization of this user is inactive",
                "No Result Found"
              );
            } else if (
              e.error.code === 100 &&
              e.error.value === "User already deleted"
            ) {
              this.toastrService.error(
                "User already deleted",
                "No Result Found"
              );
            } else if (
              e.error.code === 100 &&
              e.error.value === "No credential found"
            ) {
              this.toastrService.error(
                "No credential found",
                "No Result Found"
              );
            } else if (
              e.error.code === 100 &&
              e.error.value === "User is inactive"
            ) {
              this.toastrService.error("User is inactive", "No Result Found");
            }

            
            else if (e.error.code === 100) {
              this.toastrService.error("No Result Found", "No Result Found");
            }

          }
        } else if (e.status === 500) {
          if (e.error.code > WebConstants.STATUS.CODE_SUCCESS) {
            error = e.error.value || e.statusText;
          }
        }

        if (e.error.code === 201) {
          this.toastrService.error(
            "Enter email and password correctly",
            "Incorrect User Credentials"
          );
        } else if (error !== null) {
          //alert(error);

          this.toastrService.error("Error", error);
        }
        return throwError(error);
      })
    );
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate([WebConstants.WEB_URL.LOGIN]);
    //location.assign(WebConstants.WEB_URL.LOGIN);
  }
}


