import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';

@Component({
  selector: 'app-display-order-details',
  templateUrl: './display-order-details.component.html',
  styleUrls: ['./display-order-details.component.css']
})
export class DisplayOrderDetailsComponent implements OnInit {
  order! : any;
  darktheme : boolean = this.themeService.getTheme();

  constructor(public themeService : ThemeServiceService, public orderService : OrderService, private router : Router, public route : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.checkTheme();
    this.orderService.loadOrders(); // When refreshing the page, this is necessary to retrieve orders that were locally saved

    this.route.queryParams.subscribe(params => {
      for (let i = 0; i < this.orderService.orders.length; i++) {
        if (this.orderService.orders[i].id == params["id"]) {
          this.order = this.orderService.orders[i];
          break;
        }
      }
    })
  }

  checkTheme(){
    this.darktheme = this.themeService.getTheme();
  }

  /**
   * Redirects to order history
   */
  backToOrders() : void {
    this.router.navigate(["/orders"]);
  }

  /**
   * Formats the date, e.g. October 4, 2001
   * 
   * @param date is the object to be formatted
   * @returns the formatted date as a string
   */
  formattedDate(date : Date) : string {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date = new Date(date); // For some reason a new "Date" object must be created rather than directly using this object's date field
    let formattedDate = monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
    
    return formattedDate;
  }
}