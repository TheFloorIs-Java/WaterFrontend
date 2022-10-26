import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeServiceService } from 'src/app/services/theme-service.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input()
  orderItem! : any;
  @Input()
  productInfo! : any;
  @Input()
  productLink! : any;
  darktheme : boolean = this.themeService.getTheme();

  constructor(public themeService : ThemeServiceService, private router : Router) {

  }

  ngOnInit(): void {
    
    this.checkTheme();
  }

  checkTheme(){
    this.darktheme = this.themeService.getTheme();
  }

  getProductDetails(): void {
    console.log("Clicked on " + this.productInfo.name);

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
}