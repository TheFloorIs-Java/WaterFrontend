import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) {

  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.baseUrl + "/" + localStorage.getItem("email") + "/orders", {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}
