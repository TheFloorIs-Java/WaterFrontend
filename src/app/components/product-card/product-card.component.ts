import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Console } from 'console';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ThemeServiceService } from 'src/app/services/theme-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;

  @Input() productInfo!: Product;

  constructor(private productService: ProductService,
     private router: Router,
     public themeService : ThemeServiceService
     ) { }

  ngOnInit(): void {

    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
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

    this.products.forEach(
      (element) => {
        if(element.product == product){
          ++element.quantity;
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
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
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price
      }
      this.productService.setCart(cart);
    }

  }

  // Open product details page for when clicking the product card
  getProductDetails(): void {
    // window.location.reload();
    // Test if the component (click) feature works
    console.log("Clicked on " + this.productInfo.name);

    // Reroutes to details page, sends the id of the product clicked to the routed component
    this.router.navigate(["/" + this.productInfo.name + "/details"],
      { state:
        {
          id: this.productInfo.id,
          name: this.productInfo.name,
          quantity: this.productInfo.quantity,
          price: this.productInfo.price,
          description: this.productInfo.description,
          image: this.productInfo.image
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




}
