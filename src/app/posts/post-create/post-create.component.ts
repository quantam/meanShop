import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import {Post, PostResponse} from '../post.interface';
import {PostService} from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mimeType } from '../mime-type.validator';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title= '';
  content= '';
  mode = 'create';
  post:any;
  postId: string;
  isLoading = false;
  form: FormGroup;
  imagePreview:string;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe(params => {
      if(params.has('postId')){
        this.mode = 'edit';
        this.postId = params.get('postId');
        this.postService.getSinglePost(this.postId).subscribe((res: PostResponse)=>{
          this.post = res.post;
          this.form.setValue({title: res.post.title, content: res.post.content, image: res.post.imagePath});
        });
      }
    })
  }

  onSavePost(form: NgForm){
    this.isLoading = true;
    if(this.form.invalid){
      return;
    }
    if(this.mode === 'edit'){
      this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content,this.form.value.image).subscribe(res=> {
        this.goToList();
      });
    }else{
      this.postService.addPosts(this.form.value.title, this.form.value.content, this.form.value.image).subscribe(res => {
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
