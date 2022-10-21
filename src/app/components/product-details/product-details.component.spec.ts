import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ProductDetailsComponent } from './product-details.component';



describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
        await TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClientTestingModule ,
      ],
      
      declarations: [ ProductDetailsComponent ]

    })
    .compileComponents();
  });
  
  
  beforeEach(() => {
    window.history.pushState({id:1}, "");
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  
    component.id = 0;
    component.product = {
      id: 0, 
    name: "name", 
    quantity: 0, 
    price: 0, 
    description: "description", 
    image: "image"
    };
    component.starRating = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
