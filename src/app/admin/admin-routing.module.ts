import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'product', component: ProductComponent},
  {path: 'user', component: UserComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export  class AdminRoutingModule{

}
