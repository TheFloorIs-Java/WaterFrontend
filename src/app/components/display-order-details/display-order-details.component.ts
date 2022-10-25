import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-display-order-details',
  templateUrl: './display-order-details.component.html',
  styleUrls: ['./display-order-details.component.css']
})
export class DisplayOrderDetailsComponent implements OnInit {
  orderID! : number;

  constructor(public orderService : OrderService, private router : Router, public route : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.orderService.loadOrders(); // When refreshing the page, this is necessary to retrieve orders that were locally saved

    this.route.queryParams.subscribe(params => {
      this.orderID = this.orderService.orders.length - params['id']; // The most recent order is the first order
    })
  }

  backToOrders() : void {
    this.router.navigate(["/orders"]);
  }

  formattedDate(date : Date) : string {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date = new Date(date); // For some reason a new "Date" object must be created rather than directly using this object's date field
    let formattedDate = monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
    
    return formattedDate;
  }
}