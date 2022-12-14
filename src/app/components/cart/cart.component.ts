import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  darktheme: boolean = this.themeService.getTheme();

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
    public themeService: ThemeServiceService) {
  }

  /**
   * Initializes the cart with products the user added from the home screen or the product details page when the
   * page is loaded.
   */
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

  checkTheme() {
    this.darktheme = this.themeService.getTheme();
    console.log(this.darktheme);
  }

  /**
   * Resets the cart to empty and redirects user back to the home page
   */
  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }
//------------------------------------ Delete Item from cart---------------------------------------
  /**
   * Deletes the product from the cart. Changes are reflected in the on screen cart.
   * @param cartProduct the current product in the cart
   */
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

        this.products.splice(i, 1);
        break;
      }
    }

    this.productService.setCart(newCart);
  }
  //------------------------------------ update cart----------------------------------------------------
  /**
   * The updated cart function will update the total price and cart count  after we add or remove products from cart
   * @param productArray 
   * @param add 
   */

  updateCart(productArray: any, add: boolean) {
    let newout = {
      cartCount: 0,
      products: this.products,
      totalPrice: 0
    };
    if (add) {
      newout.cartCount = this.cartCount + 1;
      newout.totalPrice = this.totalPrice + productArray.product.price
    } else {
      newout.cartCount = this.cartCount - 1;
      newout.totalPrice = this.totalPrice - productArray.product.price
    }
    this.productService.setCart(newout);
  }
  // -------------------------------------Increment Button----------------------------------------
  /**
   This function is for the incriment  button |+| in quantity section 
   * when  we press this button it add that product by one until we will be out of Stock
   */

  incrimentButton(productArray: any) {
    if (productArray.quantity + 1 <= productArray.product.quantity) {
      productArray.quantity = productArray.quantity + 1;
      this.updateCart(productArray, true);
    }
  }

  // ------------------------------Decriment Button---------------------------------------
  /**
     * This  function is for the decriment button |-|  in quantity section 
   * when  we press this button it decrease by 1 until the quantity in stock will be 0 
   */

  decrimentButton(productArray: any) {
    if (productArray.quantity - 1 >= 0) {
      productArray.quantity = productArray.quantity - 1;
      this.updateCart(productArray, false);
    }
  }
}
































