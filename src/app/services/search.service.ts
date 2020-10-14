import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private backendUrl = environment.apiUrl + '/search';
  postListner = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  getProducts(perPage:number, currentPage:number){
    const queryParams = `?pagesize=${perPage}&page=${currentPage}`
    return this.http.get<any>(this.backendUrl+queryParams).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getCategories(){
    return this.http.get<any>(environment.apiUrl + '/category');
  }

  getSinglePost(id:string){
    return this.http.get(this.backendUrl+'/'+id).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
