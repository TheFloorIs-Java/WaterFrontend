import { DisplayOrderDetailsComponent } from './components/display-order-details/display-order-details.component';
import { DisplayOrdersComponent } from './components/display-orders/display-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: DisplayProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "orders", component: DisplayOrdersComponent },
  { path: "order-details", component: DisplayOrderDetailsComponent},
  { path: "checkout", component: CheckoutComponent }, 
  { path: ":productname/details", component: ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
