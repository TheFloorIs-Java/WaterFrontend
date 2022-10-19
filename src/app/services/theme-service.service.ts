import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  constructor() { }

  theme : boolean = false;

  getTheme(){
    this.theme = this.theme;
  }

  setTheme(newTheme : boolean){
    this.theme = newTheme;
  }
}
