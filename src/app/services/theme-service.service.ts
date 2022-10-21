import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  constructor() { }

  theme : boolean = false;

  /**
   *This function can be called to update local theme with the global theme
   * @param newTheme takes an input update for local component from the global darkThemeService
   */

  setTheme(newTheme : boolean){
    this.theme = newTheme;
  }
}
