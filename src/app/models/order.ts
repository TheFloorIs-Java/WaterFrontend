export class Order {
    id : number;
    userID : number;
    groupID : number;
    productName : string;
    productImage : string;
    productDescription : string;
    productPrice : number;
    productQuantity : number;
    date: Date;

    constructor (id: number, userID : number, groupID : number, name : string, quantity : number, description : string, price : number, image : string, date : Date) {
        this.id = id;
        this.userID = userID;
        this.groupID = groupID;
        this.productName = name;
        this.productQuantity = quantity;
        this.productDescription = description;
        this.productPrice = price;
        this.productImage = image;
        this.date = date;
    }
}
