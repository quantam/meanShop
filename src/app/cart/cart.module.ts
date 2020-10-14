import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AngularMaterialModule } from '../angular.material.module';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CartRoutingModule
  ]
})
export class CartModule { }
