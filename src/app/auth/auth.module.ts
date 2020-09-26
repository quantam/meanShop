import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AngularMaterialModule } from '../angular.material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    RouterModule,
    AngularMaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
