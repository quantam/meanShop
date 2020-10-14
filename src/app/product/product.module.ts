import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AngularMaterialModule } from '../angular.material.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ProductComponent, WishlistComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    NgbModule
  ]
})
export class ProductModule { }
