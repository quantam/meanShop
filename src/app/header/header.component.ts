import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn$ = new Observable();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn$ = this.authService.authToken$;
  }

  logout(){
    this.authService.logout();
  }

}
