import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { DarkModeService } from 'angular-dark-mode';
import { ThemeServiceService } from 'src/app/services/theme-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{


  /**
   * creating a variable that will store the state of the darkMode through the service
   */

  cartCount!: number;
  subscription!: Subscription;


  constructor(private authService: AuthService,
      private router: Router,
      private productService: ProductService,
      private darkModeService: DarkModeService,
      private themeService : ThemeServiceService) { }

  ngOnInit(): void {
    this.checkTheme();
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
  }

  darktheme : boolean = this.themeService.getTheme();



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['login']);
  }


  /**
   *This is the toggle button for the light/dark theme
   *It sets the theme for the service bool(global), and darktheme bool(local)
   *global (darkModeService) affects the entire body across the pages
   *local (themeService) affects how a particular component is affected (the navbar in this case)
   *  */

  toggled(){
    this.themeService.setTheme(!this.themeService.getTheme());
    this.darkModeService.toggle();
    this.darktheme = this.themeService.getTheme();
    console.log(this.darktheme);


  }

  /**
   * Checks local theme bool with service theme bool
   * makes sure that the navbar consistently knows the retained bool
   */

  checkTheme(){
    this.darktheme = this.themeService.getTheme();

  }




}
