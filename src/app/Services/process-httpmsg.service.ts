import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ProcessHTTPMsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any){
    let errMsg: string;

    if(error.error instanceof ErrorEvent) {
      errMsg=error.error.message;
    }
    else{
      errMsg=`${error.status}-${error.statusText || '' }${error.error}`;
    }

    return throwError(errMsg);
  }

  
}
