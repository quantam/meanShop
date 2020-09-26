import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AngularMaterialModule } from '../angular.material.module';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ProductModule { }
