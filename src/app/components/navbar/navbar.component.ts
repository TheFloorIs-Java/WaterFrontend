import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  darkMode$ = this.darkModeService.darkMode$;
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

  darktheme : boolean = false;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }


  /**
   *This is the toggle button for the light/dark theme
   *It sets the theme for the service bool(global), and darktheme bool(local)
   *
   *  */

  toggled(){
    this.themeService.theme = !this.themeService.theme;
    this.darkModeService.toggle();
    this.darktheme = this.themeService.theme;

    console.log(this.themeService.theme);

  }

  /**
   * Checks local theme bool with service theme bool
   * makes sure that the navbar consistently knows the retained bool
   */

  checkTheme(){
    this.darktheme = this.themeService.theme;
  }




}
