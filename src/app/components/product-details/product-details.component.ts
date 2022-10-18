import { Component, OnInit } from '@angular/core';
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
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

}
