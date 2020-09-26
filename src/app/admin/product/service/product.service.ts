import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interface/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private posts:Product[] = [];
  private backendUrl = environment.apiUrl + '/products';
  postListner = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  getPosts(perPage:number, currentPage:number){
    const queryParams = `?pagesize=${perPage}&page=${currentPage}`
    return this.http.get<any>(this.backendUrl+queryParams).pipe(
      map((response) => {
        return response;
      })
    );
  }

  // modifyPostData(res){
  //   return res.posts.map(post => {
  //     return {
  //       title: post.title,
  //       content: post.content,
  //       id: post._id
  //     };
  //   });
  // }

  getUpdatedPost(){
    return this.postListner.asObservable();
  }

  setUpdatedPost(data){
    this.postListner.next(data);
  }

  addPosts(title:string, content:string, image: File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    return this.http.post<any>(this.backendUrl, postData).pipe(
      map((response) => {
        this.setUpdatedPost(response);
        return response;
      })
    );
  }

  updatePost(id:string, title:string, content:string, image: any){
    let postData : Product | FormData;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('_id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    }else{
      // postData = {
      //   _id: id,
      //   name: title,
      //   content: content,
      //   imagePath: image
      // };
    }
  return this.http.put<any>(this.backendUrl+'/'+id, postData).pipe(
      map((response) => {
        return response;
      })
    );
  }

  deletePost(id:string){
    return this.http.delete(this.backendUrl+'/'+id).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getSinglePost(id:string){
    return this.http.get(this.backendUrl+'/'+id).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
