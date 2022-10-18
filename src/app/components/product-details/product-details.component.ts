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
  product: Product = {
    id: 0, 
    name: "", 
    quantity: 0, 
    price: 0, 
    description: "", 
    image: ""
  };
  
  constructor(private productService: ProductService, private router: Router ) { 
    this.product.id = history.state.id;
    this.product.name = history.state.name;
    this.product.quantity = history.state.quantity;
    this.product.price = history.state.price;
    this.product.description = history.state.description;
    this.product.image = history.state.image;
    
    this.productService.getSingleProduct(this.product.id).subscribe(
      res => console.log(res)
    );
  }

  ngOnInit(): void {
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
