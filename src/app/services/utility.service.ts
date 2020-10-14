import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private backendUrl = environment.apiUrl + '/cart';
  postListner = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }


  addToCart(body){
    return this.http.post(this.backendUrl, body);
  }

  getCart(){
    return this.http.get(this.backendUrl);
  }
}
