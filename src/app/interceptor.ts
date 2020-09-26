import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const token = this.authService.getToken();
    if(token){
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      })
      return next.handle(authRequest);
    }else{
      return next.handle(req);
    }
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler){
  //   return next.handle(req).pipe(catchError((error:HttpErrorResponse) => {
  //     console.log('error', error);
  //     return throwError(error);
  //   }))
  // }

}
