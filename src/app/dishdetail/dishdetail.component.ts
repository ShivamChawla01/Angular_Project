import { Component, OnInit, ViewChild, Inject} from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment';
import { baseURL } from '../shared/baseURL';
import { visibility, expand, flyInOut } from '../animation/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
 
  dish: Dish;
  visibility = 'shown';
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  responseForm: FormGroup;
  Comments: Comment[];
  response: Comment;
  c: Comment;
  getdishErr: string;
  getCommentErr: string;
  
  formErrors = {
    'author': '',
    'comment':''
  };

  validationMessages = {
    'author':{
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long',
      'maxlength': 'Name cannot be more than 25 characters long'
    },
    'comment':{
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long',
      'maxlength': 'Comment cannot be more than 25 characters long'
    }
  };
  constructor( private dishservice: DishService,private route: ActivatedRoute,private location: Location, private fb: FormBuilder,
  @Inject('baseURL') private BaseURL) { }
  @ViewChild('fform') responseFormDirective;
  ngOnInit() {
    this.createForm();
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds=dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']);}))
    .subscribe(dish=>{this.dish=dish; this.dishcopy=dish; this.setPrevNext(dish.id); this.visibility='shown'}, errmess =>{ this.dish = null; this.getdishErr=<any>errmess });

    
  }

  setPrevNext(dishId: number){
    let index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length +index - 1) % this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length +index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

  createForm() {
    this.responseForm=this.fb.group({
      author:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 4,
      date:''
      
    });

    this.responseForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.responseForm) { return; }
    const form=this.responseForm;

    for(const field in this.formErrors) {
      this.formErrors[field]='';
      const control=form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages=this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field]+=messages[key] + ' ';
        }

      }
    }
  }

  onSubmit() {
    this.response=this.responseForm.value;
    this.response.date=new Date().toISOString();
    console.log(this.response);
    this.dishcopy.comments.push(this.response);
    this.dishcopy.save()
    .subscribe( dish => {this.dish = dish; console.log(this.dish)});
    
  
  
    console.log(this.response);
    this.responseForm.reset({
      name:'',
      comment:'',
      rating:4
      
    });
    // this.ngOnInit();
  //  this.responseFormDirective.resetForm();
  }

  }


