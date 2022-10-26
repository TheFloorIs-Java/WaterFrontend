import { DisplayProductsComponent } from './../display-products/display-products.component';

import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let httpMock: HttpTestingController;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClientTestingModule,
      ],
      declarations: [CartComponent]
    })
      .compileComponents();

   fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);

    // let productService: ProductService;

    productService.getCart().subscribe(
      (cart) => {
        component.cartCount = cart.cartCount;
        component.products = cart.products;
        component.products.forEach(
          (element) => component.cartProducts.push(element.product)
        );
        component.totalPrice = cart.totalPrice;
      }
    );

 
    // component.cartCount = 1;
    fixture.detectChanges();

  });

  it('should  deleteItemFromCart', () => {
    let product = new Product(0,"name",0,"description",10,"image");
    component.cartProducts.push(product);
    let newout = {
      cartCount: 1,
      products: component.cartProducts,
      totalPrice: 10
    };
    console.log(component.cartProducts);
    console.log(newout.cartCount + " this is before removed");
    component.deleteItemFromCart(product);
    console.log(newout.cartCount + " this should be the result");
    expect(newout.cartCount).toBe(1);
  });

});
