import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { AngularMaterialModule } from '../angular.material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class PostModule { }
