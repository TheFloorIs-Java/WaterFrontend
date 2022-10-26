import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ThemeServiceService } from 'src/app/services/theme-service.service';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css']
})
export class DisplayOrdersComponent implements OnInit {
  empty : boolean = false;
  darktheme : boolean = this.themeService.getTheme();
 
  constructor(public themeService : ThemeServiceService, public orderService : OrderService, private router : Router) {

  }

  ngOnInit(): void {
    this.checkTheme();
    this.retrieveOrders();
  }

  checkTheme(){
    this.darktheme = this.themeService.getTheme();
  }

  retrieveOrders() : void {
    this.orderService.getAllOrders().subscribe(
      (resp) => this.orderService.orders = resp,
      (err) => console.log(err),
      () => {
        console.log("Ordered Items Retrieved");

        if (this.orderService.orders.length == 0) {
          this.empty = true;

        } else {
          localStorage.setItem("orders", JSON.stringify(this.orderService.orders)); // Saving the orders for the order details page, since refreshing or leaving the order details page would lose date
        }
    });
  }

  formattedDate(date : Date) : string {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date = new Date(date); // For some reason a new "Date" object must be created rather than directly using this object's date field
    let formattedDate = monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
    
    return formattedDate;
  }
}