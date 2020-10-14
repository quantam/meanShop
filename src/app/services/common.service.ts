import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private backendUrl = environment.apiUrl + '/search';
  postListner = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }


  getCategories(){
    return this.http.get<any>(environment.apiUrl + '/category');
  }
}
