import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {AngularMaterialModule} from './angular.material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { Interceptor } from './interceptor';
import {ErrorInterceptor} from './error.interceptor';
import { PostModule } from './posts/post.module';
import { ProductModule } from './product/product.module';
import { ListingModule } from './listing/listing.module';
import { CartModule } from './cart/cart.module';
import { MiniCartComponent } from './cart/mini-cart/mini-cart.component';
import { CartRoutingModule } from './cart/cart-routing.module';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MiniCartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    PostModule,
    ProductModule,
    ListingModule,
    NgbModule,
    CartModule,
    CartRoutingModule
    // AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent, MiniCartComponent]
})
export class AppModule { }
