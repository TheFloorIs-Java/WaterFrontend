import { Injectable } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  constructor(private darkModeService : DarkModeService,) {

    /**
     * Subscribes the observables state change to the global theme service
     */
    this.darkMode$.subscribe(
      data=> {this.theme = data}
   )

   }

    darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  private theme : boolean = false;


  /**
   *This function can be called to update local theme with the global theme
   * @param newTheme takes an input update for local component from the global darkThemeService
   */
  setTheme(newTheme : boolean){
    this.theme = newTheme;


  }

  getTheme(){
    return this.theme = this.theme;

  }







}
