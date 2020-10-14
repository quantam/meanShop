import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth.guard';
import { ProductComponent } from './product/product/product.component';

const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'create', component: PostCreateComponent, canActivate:[AuthGuard]},
  {path: 'edit/:postId', component: PostCreateComponent, pathMatch:'full', canActivate:[AuthGuard]},
  {path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export  class AppRoutingModule {


}
