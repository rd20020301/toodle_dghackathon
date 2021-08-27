import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

import { AuthenticationService } from '../services/authentication.service';
import { AdminLocalStorageService } from '../services/admin-local-storage.service';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService
    , private localStorage: AdminLocalStorageService
    , private router: Router
    , private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authData = this.localStorage.getToken();
        let requestItem = request;
        if (authData) {
            requestItem = request.clone({
                headers: request.headers.set("Authorization",
                    authData.jwtToken)
            });
        }
        return next.handle(requestItem).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              //letting it pass
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.localStorage.deleteToken();
                    this.toastr.error("Please login again.", "Session ended");
                    this.router.navigate(['/']);
                }
            }
        });
    }
}