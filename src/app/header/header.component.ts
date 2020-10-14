import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { SearchService } from '../services/search.service';
import {shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn$ = new Observable();
  categoryList$: Observable<any>;

  constructor(private authService: AuthService, private searchService: SearchService) { }

  ngOnInit() {
    this.loggedIn$ = this.authService.authToken$;
    this.categoryList$ = this.searchService.getCategories().pipe(shareReplay());

  }

  logout(){
    this.authService.logout();
  }

}
