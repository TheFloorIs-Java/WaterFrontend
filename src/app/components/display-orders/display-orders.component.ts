import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderGroup } from 'src/app/models/order-group';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.css']
})
export class DisplayOrdersComponent implements OnInit {
  allOrders! : Array<Order>;
  groupedOrders! : Array<OrderGroup>;
  empty : boolean = false;
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
  constructor(private orderService : OrderService) {

  }

  ngOnInit(): void {
    this.retrieveOrders();
  }

  retrieveOrders() {
    this.orderService.getOrders().subscribe(
      (resp) => this.allOrders= resp,
      (err) => console.log(err),
      () => {
        console.log("Orders Retrieved");

        if (this.allOrders.length == 0) {
          this.empty = true;

        } else {
          this.groupOrders();
        }
    });
  }

  groupOrders() {
    // Groups
    let groupedOrders = new Array<OrderGroup>();

    // Group
    let groupID = 1;
    let ordersPerGroup = new Array<Order>();
    let totalPrice = 0;

    // Order
    let orderID = 1;
    let orderIndex = orderID - 1;
    let order;

    while (orderIndex < this.allOrders.length) {
      order = this.allOrders[orderIndex];

      // If the current order is within the same group
      if (order.groupID == groupID) {
        // If the current order is not the last order
        if (orderIndex + 1 < this.allOrders.length) {
          ordersPerGroup.push(order);
          totalPrice += order.productPrice * order.productQuantity;

        } else {
          ordersPerGroup.push(order);
          totalPrice += order.productPrice * order.productQuantity;
          let date = new Date(order.date); // For some reason a new "Date" object must be created rather than directly using the order's date field
          let refinedDate = this.monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
          groupedOrders.push(new OrderGroup(groupID, ordersPerGroup, refinedDate, this.formatNumber(totalPrice)));
        }

      } else {
        let date = new Date(this.allOrders[orderIndex - 1].date);
        let refinedDate = this.monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
        groupedOrders.push(new OrderGroup(groupID, ordersPerGroup, refinedDate, this.formatNumber(totalPrice)));

        groupID++;
        ordersPerGroup = new Array<Order>();
        totalPrice = 0;

        // Must handle the current order, even though it's not within the same group, since the next iteration will handle the order after this one rather than this one. I totally missed this at first
        if (orderIndex + 1 < this.allOrders.length) {
          ordersPerGroup.push(order);
          totalPrice += order.productPrice * order.productQuantity;

        } else {
          ordersPerGroup.push(order);
          totalPrice += order.productPrice * order.productQuantity;
          let date = new Date(order.date);
          let refinedDate = this.monthNames[date.getUTCMonth()] + " " + date.getUTCDate() + ", " + date.getUTCFullYear();
          groupedOrders.push(new OrderGroup(groupID, ordersPerGroup, refinedDate, this.formatNumber(totalPrice)));
        }
      }

      orderIndex++;
    }

    this.groupedOrders = groupedOrders;
  }

  // Formats the number so that there's only a max of two decimal places. There may be less decimal places displayed
  // Rounds up the number to the second decimal place
  // The "+" converts the number into a string
  formatNumber(number : number) {
    return +(Math.round(number * 100) / 100).toFixed(2);
  }
}