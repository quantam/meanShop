import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  authToken$ = new BehaviorSubject<boolean>(false);
  tokenTimer:NodeJS.Timer;
  private userId:string;
  constructor(private http: HttpClient) { }

  signUp(email:string, password:string){
    const data = {email:email, password:password};
    return this.http.post<any>('http://localhost:3000/api/user/signup', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  login(email:string, password:string){
    const data = {email:email, password:password};
    return this.http.post<any>('http://localhost:3000/api/user/login', data).pipe(
      map((response) => {
        const expiersIn = response.expiresIn;
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, expiersIn * 1000 );
        if(response.token){
          this.setAuthToLocal(response.token, expiersIn);
          this.userId = response.userId;
          this.authToken$.next(true);
        }
        return response;
      })
    );
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUserId(){
    return this.userId;
  }

  logout(){
    this.authToken$.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.deleteAuth();
  }

  private setAuthToLocal(token, expiresIn){
    const now = new Date();
    const expire = new Date(now.getTime() + expiresIn * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expire.toISOString());
  }

  private deleteAuth(){
    localStorage.removeItem('token');
    localStorage.removeItem('expireIn');
  }

  private getAuth(){
    const token = localStorage.getItem('token');
    const expireIn = localStorage.getItem('expireIn');

    if( !token || !expireIn){
      return;
    }
    return {token : token, expireIn: new Date(expireIn)};
  }
}
