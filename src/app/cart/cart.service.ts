import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private backendUrl = environment.apiUrl + '/cart';
  constructor( private http: HttpClient) { }

  addToCart(body) {
    return this.http.post(this.backendUrl, body);
  }

  getCartInfo() {
    return this.http.get(this.backendUrl);
  }
}
