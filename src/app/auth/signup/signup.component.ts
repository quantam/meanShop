import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading:boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form:NgForm){
    this.isLoading = true;
    if(form.invalid){
      return;
    }
    this.authService.signUp(form.value.email, form.value.password).subscribe(res =>{
      this.isLoading = false;
      this.router.navigate(['login']);
       });
    form.reset();
  }
}
