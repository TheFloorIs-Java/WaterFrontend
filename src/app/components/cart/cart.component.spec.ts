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
      imports: [HttpClientTestingModule,],
      providers: [HttpClientTestingModule,],
      declarations: [CartComponent]
    })
      .compileComponents();

      });

  it('should  deleteItemFromCart', () => {
     component.totalPrice = 10.99;
    component.cartCount = 1;
     component.products = [
      {
        product: {
          id: 1,
          name: 'glass',
          quantity: 1,
          price: 20,
          description: 'A nice glass',
          image: 'blank',
        },
        quantity:1

      }
    ]
       
    component.deleteItemFromCart(1);
    expect(component.cartCount).toBe(1);
    expect(component.totalPrice).toBe(0)
  });
});


 




