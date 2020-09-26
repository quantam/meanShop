import { Component, OnInit, Input } from '@angular/core';
import {PostService} from '../post.service';
import { Post } from '../post.interface';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$:Observable<any>;
  isLoading = false;
  currentPage = 1;
  perPage = 2;
  loggedIn$ = new Observable();
  userId:string;

  constructor(private postService:PostService, private authService: AuthService) { }

  ngOnInit() {
    this.posts$ = this.postService.getPosts(this.perPage, this.currentPage).pipe(shareReplay());
    this.loggedIn$ = this.authService.authToken$;
    this.userId = this.authService.getUserId();
  }

  onDelete(id){
    this.postService.deletePost(id).subscribe(res => {
      this.posts$ = this.postService.getPosts(this.perPage, this.currentPage).pipe(shareReplay());
    });
  }

  onPageChanged(event:PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.perPage = event.pageSize
    this.posts$ = this.postService.getPosts(this.perPage, this.currentPage).pipe(shareReplay());
  }
}
