import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders! : Array<any>;

  constructor(private http : HttpClient) {

  }

  public getAllOrders() {
    return this.http.get<Array<any>>(environment.baseUrl + "/" + localStorage.getItem("email") + "/orders", {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public submitOrder(order : any) {
    this.http.post(environment.baseUrl + "/orders", order, {headers: environment.headers, withCredentials: environment.withCredentials}).subscribe();
  }

  loadOrders() : void {
    this.orders = JSON.parse(<string> localStorage.getItem("orders"));
  }
}
