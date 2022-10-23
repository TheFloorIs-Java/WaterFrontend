import { Order } from "./order";

export class OrderGroup {
    id : Number;
    orders : Array<Order>;
    date : string;
    totalPrice : Number;

    constructor(id : Number, orders : Array<Order>, date : string, totalPrice : Number) {
        this.id = id;
        this.orders = orders;
        this.date = date;
        this.totalPrice = totalPrice;
    }
}
