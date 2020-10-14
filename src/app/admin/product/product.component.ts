import { Component, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
// import { mimeType } from '../../mime-type.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';

import { ProductService } from './service/product.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @ViewChild('auto',{static:true}) matAutocomplete: MatAutocomplete;
  title= '';
  content= '';
  mode = 'create';
  post:any;
  postId: string;
  isLoading = false;
  productForm: FormGroup;
  imagePreview:string;
  categories$:Observable<any>;

  products$:Observable<any>;
  tags:string[] = ['Trending', 'Best Seller', 'Offer', 'New Arrival', 'High Rated' ];
  selectedtags:string[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      originalPrice: new FormControl(null, {validators:[Validators.required]}),
      offerPrice: new FormControl(null),
      description: new FormControl(null, {validators:[Validators.required]}),
      category: new FormControl(null, {validators:[Validators.required]}),
      inStock: new FormControl(null, {validators:[Validators.required]}),
      totalStock: new FormControl(null, {validators:[Validators.required]}),
      tags: new FormControl(null),
      image: new FormControl(null)
    });
    this.route.paramMap.subscribe(params => {
      if(params.has('postId')){
        this.mode = 'edit';
        this.postId = params.get('postId');
        // this.productService.getSinglePost(this.postId).subscribe((res: PostResponse)=>{
        //   this.post = res.post;
        //   this.form.setValue({title: res.post.title, content: res.post.content, image: res.post.imagePath});
        // });
      }
    });

    this.categories$ = this.productService.getCategories().pipe(shareReplay());
    this.products$ = this.productService.getProducts(10, 1).pipe(shareReplay());
  }

  onSavePost(form: NgForm){
    this.isLoading = true;
    if(this.productForm.invalid){
      return;
    }
    if(this.mode === 'edit'){
      this.productService.updatePost(this.postId, this.productForm.value.title, this.productForm.value.content,this.productForm.value.image).subscribe(res=> {
        this.goToList();
      });
    }else{
      this.productService.addProduct(this.productForm.value).subscribe(res => {
        console.log(res);
      });
    }
    this.productForm.reset();
  }

  goToList(){
    this.router.navigate(['/']);
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({image: file});
    this.productForm.get('image').updateValueAndValidity();
    const reader= new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
