import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType} from '../shared/feedback';

import { flyInOut, expand } from '../animation/app.animation';
import { Restangular } from 'ngx-restangular';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {'[@flyInOut]': 'true',
  'style': 'display: block;'},
animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType=ContactType;
  feedback_mess: string;
  flag: boolean;

  formErrors = {
    'firstname': '',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessages = {
    'firstname':{
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters long'
    },
    'lastname':{
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters long'
    },
    'telnum':{
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. Number must contain only numbers.' 
    },
    'email':{
      'required':'Email os required.',
      'email': 'Email not in valid format'
    }
  };
  constructor( private fb: FormBuilder,
  private restangular: Restangular,
private feed: FeedbackService) { }
  @ViewChild('fform') feedbackFormDirective;
  ngOnInit() {
    this.createForm();
    this.flag=false;
  }

  createForm() {
    this.feedbackForm=this.fb.group({
      firstname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required, Validators.pattern]],
      email:['',[Validators.required, Validators.email ]],
      agree:false,
      contacttype: 'None',
      message:''

    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm) { return; }
    const form=this.feedbackForm;

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
    this.feedback=this.feedbackForm.value;
    console.log(this.feedback);
    this.flag=true;
    
    this.feedback_mess=this.feed.submitFeedback(this.feedback);
    // this.restangular.all('feedback').post(this.feedback);
    setTimeout (() => {
      console.log("Hello from setTimeout");
   }, 5000);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:'',
      email:'',
      agree:false,
      contacttype:'None',
      message:''
    });
   this.feedbackFormDirective.resetForm();
  }

}
