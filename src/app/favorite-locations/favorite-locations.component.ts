import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import {Observable} from 'rxjs';
import {Location} from '../state-management/model'
import { Router } from '@angular/router';
import { MiniService } from '../mini.service';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.css']
})
export class FavoriteLocationsComponent implements OnInit {

  favoriteLocations$ : Observable<{favorites: Location[], celsiusMode: string}>;
  constructor(private store: Store<fromApp.AppState>,  private router: Router, private miniService: MiniService){}

  ngOnInit() {
    this.favoriteLocations$ = this.store.select('locations')
  }

  showCity(location: Location){
    this.miniService.defaultCity.next({id: location.id, city: location.city, country: location.country})
    this.router.navigate(['/weather']);
  }
 
  createIconURL(icon: number): string {
    return "https://developer.accuweather.com/sites/default/files/" + (icon < 10 ? "0" : "") + icon + "-s.png";
  }

  getTemperature(temperature: number, celsiusMode: string){
    if(celsiusMode == 'celsius'){
      return Math.round(temperature) + '\xB0  c'
    }else{
      let fahrenheit = temperature*9/5 + 32;
      return Math.round(fahrenheit) + '\xB0  F'
    }
  }
}
