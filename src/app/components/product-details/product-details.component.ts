import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // Plan: Retrieve product details from product-card component
  // When click on the product, open a page for product details
  id: number = 0;
  product: Product = {
    id: 0, 
    name: "", 
    quantity: 0, 
    price: 0, 
    description: "", 
    image: ""
  };
  starRating: number = 0;


  
  constructor(private productService: ProductService, private router: Router ) {
    // this.product = JSON.parse(sessionStorage.getItem(String(this.id)) || '{}');
    if (sessionStorage.getItem('currentProduct')) {
      this.product = JSON.parse(sessionStorage.getItem('currentProduct') || '{}');
      console.log("localstorage");
    } else {
      console.log(this.id);
      console.log("nothing in sessionstorage");
    }
  }

  ngOnInit(): void {
    // Check if there is a product loaded into sessionStorage
    // If yes, set the product to the product in sessionStorage
    // Else, use the product id to pull from the database
    this.id = history.state.id;
    console.log(this.id);

    this.productService.getSingleProduct(this.id).subscribe(
      res => { 
        sessionStorage.setItem('currentProduct', JSON.stringify(res));
        this.product = res;
      }
    );

    // this.productService.getSingleProduct(this.id).subscribe(
    //   res => this.product = res
    // )
  }

  addToCart(product: Product): void {

    // let inCart = false;

    // this.products.forEach(
    //   (element) => {
    //     if(element.product == product){
    //       ++element.quantity;
    //       let cart = {
    //         cartCount: this.cartCount + 1,
    //         products: this.products,
    //         totalPrice: this.totalPrice + product.price
    //       };
    //       this.productService.setCart(cart);
    //       inCart=true;
    //       return;
    //     };
    //   }
    // );

    // if(inCart == false){
    //   let newProduct = {
    //     product: product,
    //     quantity: 1
    //   };
    //   this.products.push(newProduct);
    //   let cart = {
    //     cartCount: this.cartCount + 1,
    //     products: this.products,
    //     totalPrice: this.totalPrice + product.price
    //   }
    //   this.productService.setCart(cart);
    // }
      
  }

}
