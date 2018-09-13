import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseURL';



import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback): string{
    return this.restangular.all('feedback').post(feedback);
  }
}
