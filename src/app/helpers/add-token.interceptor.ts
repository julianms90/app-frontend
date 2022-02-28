import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators'
@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private tosatr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if  (token) {
      request = request.clone({ setHeaders: {Authorization: `Bearer ${token}`}});
    }

    // return next.handle(request).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 401){
    //       this.tosatr.error('Sesion expirada, por favor vuelva a loguearse', 'Error')
    //       this.router.navigate(['/inicio/login'])
    //     }
    //     return throwError(error);
    //   })
    // )
    return next.handle(request);
  }
}
