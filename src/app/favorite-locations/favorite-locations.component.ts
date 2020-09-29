import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import {Observable, of} from 'rxjs';
import {Location} from '../state-management/model'
import { LoadLocationData } from '../state-management/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.css']
})
export class FavoriteLocationsComponent implements OnInit {

  favoriteLocations$ : Observable<Location[]>;
  isCelsiusMode: boolean = true;
  constructor(private store: Store<fromApp.AppState>,  private router: Router){}

  ngOnInit() {
    this.store.select('locations').subscribe(state => {
      this.favoriteLocations$ = of(state.favorites);
      of(state.isCelsiusMode).subscribe(isCelsiusMode =>{
        this.isCelsiusMode = isCelsiusMode;
      });
    });
  }

  showCity(location: Location){
    this.store.dispatch(new LoadLocationData({id: location.id, city: location.city, country: location.country}))
    this.router.navigate(['/weather']);
  }
 

  createIconURL(icon: number): string {
    return "https://developer.accuweather.com/sites/default/files/" + (icon < 10 ? "0" : "") + icon + "-s.png";
  }

  getTemperature(temperature: number){
    if(this.isCelsiusMode){
      return Math.round(temperature) + '\xB0  c'
    }else{
      let fahrenheit = temperature*9/5 + 32;
      return Math.round(fahrenheit) + '\xB0  F'
    }
  }
}
