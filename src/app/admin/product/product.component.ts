import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { mimeType } from '../../mime-type.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './service/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  title= '';
  content= '';
  mode = 'create';
  post:any;
  postId: string;
  isLoading = false;
  productForm: FormGroup;
  imagePreview:string;
  categories:any[] = [
    {name: 'Electronics', id:1},
    {name: 'Mobile', id:2},
    {name: 'Laptop', id:3}
  ]

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      price: new FormControl(null, {validators:[Validators.required]}),
      description: new FormControl(null, {validators:[Validators.required]}),
      category: new FormControl(null, {validators:[Validators.required]}),
      quantity: new FormControl(null, {validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required]})
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
    })
  }

  onSavePost(form: NgForm){
    this.isLoading = true;
    if(this.form.invalid){
      return;
    }
    if(this.mode === 'edit'){
      this.productService.updatePost(this.postId, this.form.value.title, this.form.value.content,this.form.value.image).subscribe(res=> {
        this.goToList();
      });
    }else{
      this.productService.addPosts(this.form.value.title, this.form.value.content, this.form.value.image).subscribe(res => {
        this.goToList();
      });
    }
    this.form.reset();
  }

  goToList(){
    this.router.navigate(['/']);
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader= new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
