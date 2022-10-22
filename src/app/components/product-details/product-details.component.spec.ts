import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductDetailsComponent } from './product-details.component';
import { Product } from 'src/app/models/product';
import { Observable, of } from 'rxjs';

let testProduct;

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    testProduct = null;

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClientTestingModule, 
        { provide: ProductDetailsComponent, useValue: testProduct }
      ],
      declarations: [ProductDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;

    window.history.pushState({ id: 1 }, "");
    component.id = 0;
    component.product = {
      id: 0,
      name: "name",
      quantity: 0,
      description: "description",
      price: 0,
      image: "image"
    };
    component.starRating = 1;
    fixture.detectChanges();
  });

  it('should test that ngOninit initializes the product', () => {
    let product = new Product(0, "name", 0, "description", 0, "image");
    testProduct = of(product);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.product).toEqual(product);
    });

    testProduct.subscribe(
      res => expect(res).toEqual(product) 
    );

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


