import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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

  
  constructor(private productService: ProductService, private router: Router ) {
    
  }

  ngOnInit(): void {
    this.productService.getSingleProduct(this.id).subscribe(
      res => this.product = res
    );
    // localStorage.setItem('currentProduct', JSON.stringify(this.product));
    // this.product = JSON.parse(localStorage.getItem('currentProduct'));
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
