import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // Plan: Retrieve product details from product-card component
  // When click on the product, open a page for product details

  // For products details
  id: number = 0;
  starRating: number = 4;

  product: Product = {
    id: 0,
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    image: ""
  };

  // For adding to cart
  subscription!: Subscription;
  cartCount!: number;
  totalPrice: number = 0;
  productsInCart: {
    product: Product,
    quantity: number
  }[] = [];



  constructor(private productService: ProductService,
     private router: Router,
     public themeService : ThemeServiceService ) {
  }

  ngOnInit(): void {
    this.id = history.state.id;

    // Maintains the product information when page is refreshed
    if (sessionStorage.getItem('currentProduct')) {
      this.product = JSON.parse(sessionStorage.getItem('currentProduct')!);
    } else {
      this.productService.getSingleProduct(this.id).subscribe(
        res => {
          sessionStorage.setItem('currentProduct', JSON.stringify(res));
          this.product = res;
        }
      );
    }

    // Get state of the current cart
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.productsInCart = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  darktheme = this.themeService.getTheme();

  checkTheme(){
    this.darktheme = this.themeService.getTheme();
  }


  addToCart(product: Product): void {
    let inCart = false;

    this.productsInCart.forEach(
      (element) => {
        if(element.product == product){
          ++element.quantity;
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.productsInCart,
            totalPrice: this.totalPrice + product.price
          };
          this.productService.setCart(cart);
          inCart=true;
          return;
        };
      }
    );

    if(inCart == false){
      let newProduct = {
        product: product,
        quantity: 1
      };
      this.productsInCart.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.productsInCart,
        totalPrice: this.totalPrice + product.price
      }
      this.productService.setCart(cart);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    sessionStorage.removeItem('currentProduct');
  }

}
