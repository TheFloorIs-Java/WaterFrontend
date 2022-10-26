import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { ThemeServiceService } from 'src/app/services/theme-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  darktheme : boolean = this.themeService.getTheme();

  products: {
    product: Product,
    quantity: number,
  }[] = [];

  totalPrice!: number;
  cartProducts: Product[] = [];
  cartCount!: number;
    
   

  constructor(private productService: ProductService,
      private http: HttpClient,
      private router: Router,
      public themeService : ThemeServiceService) {

  }

  ngOnInit(): void {
    this.checkTheme();
    console.log(this.darktheme);
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
    console.log(this.products);
  }

  checkTheme(){
    this.darktheme = this.themeService.getTheme();
    console.log(this.darktheme);
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

  getCartIndex(index: number, cartProduct: {p: Product, quantity: number}): number {
    return index;
  }

  deleteItemFromCart(cartProduct: Product): void {
    let newCart = {
      cartCount: 0,
      products: this.products,
      totalPrice: 0
    };

    // Find the correct product and update the cart's total price and quantity
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].product.id === cartProduct.id) {
        newCart.cartCount = this.cartCount - this.products[i].quantity;
        newCart.totalPrice = this.totalPrice - this.products[i].product.price * this.products[i].quantity;
        break;
      }
    }

    this.productService.setCart(newCart);
    this.deleteProductFromScreen(cartProduct);
  }


  /**
   * This for loop removes the whole product selection from screen/cart instead of its singular quantity
   * Getting the product from the template
   */
  deleteProductFromScreen(cartProduct: Product) {
    console.log(cartProduct.name);
    for (let i = 0; i < this.products.length; i += 1) {
      if (this.products[i].product.id === cartProduct.id) {
        this.products.splice(i, 1);
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
































