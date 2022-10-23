import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: {
    product: Product,
    quantity: number,
  }[] = [];
  /**
   * there was ! sign on total price
   */
  totalPrice!: number;
  cartProducts: Product[] = [];
  cartCount!: number;

  constructor(private productService: ProductService,
     private http: HttpClient,
      private router: Router,
      private themeService : ThemeServiceService) {

  }

  ngOnInit(): void {
    this.checkTheme();
    this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
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
    console.log(this.themeService.getTheme());
  }



  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }

  deleteItemFromCart(productArray: any): void {
    this.deleteProductFromScreen(productArray);
    let newout = {
      cartCount: 0,
      products: this.products,
      totalPrice: 0
    };

    newout.cartCount = this.cartCount - productArray.quantity;
    newout.totalPrice = this.totalPrice - productArray.product.price * productArray.quantity

    this.productService.setCart(newout);
  }


  /**
   * This for loop removes the whole product selection from screen/cart instead of its singular quantity
   */
  deleteProductFromScreen(productArray: any) {
    for (let i = 0; i < this.products.length; i += 1) {
      if (this.products[i].product.id === productArray.product.id) {
        this.products.splice(i, 1);
        console.log(this.cartCount);
        break;
      }

    }
  }

  updateCart(productArray: any, add: boolean) {
    let newout = {
      cartCount: 0,
      products: this.products,
      totalPrice: 0
    };
    if(add) {
      newout.cartCount = this.cartCount + 1;
      newout.totalPrice = this.totalPrice + productArray.product.price
    } else {
      newout.cartCount = this.cartCount -1;
      newout.totalPrice = this.totalPrice - productArray.product.price

    }
    this.productService.setCart(newout);
  }







incrimentButton(productArray: any){
  if (productArray.quantity + 1 <= productArray.product.quantity) {
    productArray.quantity = productArray.quantity + 1;
  this.updateCart(productArray, true);
    //  this.productService.incrimentButton(Product.quantity)
  }
}


decrimentButton(productArray : any){
  if (productArray.quantity - 1 >= 0) {
    productArray.quantity = productArray.quantity - 1;
    this.updateCart(productArray, false);
  }
}



}
































