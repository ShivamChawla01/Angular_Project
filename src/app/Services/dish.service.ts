import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';



import { Observable, of } from 'rxjs';

import { delay } from 'rxjs/operators';

import { Response } from '@angular/Http';

import { HttpClient } from '@angular/common/http';

import { baseURL } from '../shared/baseURL';



import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Restangular } from 'ngx-restangular';









@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular: Restangular) { }

  getDishes(): Observable<Dish[]>{
    return this.restangular.all('dishes').getList();
    
  }

  getDish(id: number): Observable<Dish>{

    return this.restangular.one('dishes', id).get();

  }

  // getComments(id: number): Observable<Comment[]>{
    
  //       return of((DISHES.filter((dish) => (dish.id === id))[0]).comments).pipe(delay(2000));
        
    
  //     }

  getFeaturedDish(): Observable<Dish>{

    return this.restangular.all('dishes').getList({featured: true})
    .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any>{
    return this.getDishes()
    .pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}
