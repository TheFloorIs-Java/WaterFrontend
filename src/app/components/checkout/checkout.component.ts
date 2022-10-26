import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 
  
  name! : string;
  street! : string;
  city! : string;
  state! : string;
  zip! : string;

  card! : string;

  checkoutForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', Validators.required),
    lname: new UntypedFormControl('', Validators.required),
    cardName: new UntypedFormControl('', Validators.required),
    detail: new UntypedFormControl('', Validators.required),
    addOne: new UntypedFormControl('', Validators.required),
    addTwo: new UntypedFormControl(''),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipCode: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required)
  });

  constructor(private orderService : OrderService,
    private productService: ProductService,
    private router: Router,
    public themeService : ThemeServiceService) { }

  ngOnInit(): void {
    this.checkTheme();
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  darktheme : boolean = this.themeService.getTheme();

  checkTheme(){
    this.darktheme = this.themeService.getTheme();
    console.log(this.darktheme);
  }
  
  onSubmit(): void {
    let order = {
      user: {email: localStorage.getItem("email")},
      name: this.name,
      street: this.street,
      city: this.city,
      state: this.state,
      zip: this.zip,
      lastDigitsCardNo: this.card.substring(this.card.length - 4),
      costOfItems: 0,
      costOfShipping: 0,
      tax: 0,
      totalCost: 0,
      items: new Array<any>()
    }

    this.products.forEach(
      (element) => {
        const id = element.product.id;
        const quantity = element.quantity
        this.finalProducts.push({id, quantity})

        let orderItem = {
          productName: element.product.name,
          productImage: element.product.image,
          productDescription: element.product.description,
          productPrice: element.product.price,
          productQuantity: element.quantity
        }

        order.costOfItems += orderItem.productPrice * orderItem.productQuantity;
        order.items.push(orderItem);
      } 
    );

    order.totalCost = order.costOfItems + order.costOfShipping + order.tax;

    this.orderService.submitOrder(order);

    if(this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err),
        () => {
          let cart = {
            cartCount: 0,
            products: [],
            totalPrice: 0.00
          };
          this.productService.setCart(cart);
          this.router.navigate(['/home']);
        }
      );

    } else {
      this.router.navigate(['/home']);
    }
  }

  // Formats the number so that there's only a max of two decimal places. There may be less decimal places displayed
  // Rounds up the number to the second decimal place
  formatNumber(number : Number) : Number {
    return +(Math.round((<number> number) * 100) / 100).toFixed(2);
  }
}
