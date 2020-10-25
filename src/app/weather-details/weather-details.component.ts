import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadAddToFavorite, LoadRemoveFromFavorite } from '../state-management/actions';
import * as fromApp from '../app.reducer';
import {Location} from '../state-management/model'

import {Observable} from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private store: Store<fromApp.AppState>) { }
  weather$ : Observable<{location: Location,  celsiusMode: string}>;
  isReady$;
  loading = true
  ngOnInit(): void {
    this.weather$ = this.store.select('locations')
  }

  getDayName(day: string){
    let dayCode = new Date(day).getDay();
    return this.days[dayCode];
  }

  addToFavorite(cityId: number){
    // console.log(cityId)
    this.store.dispatch(new LoadAddToFavorite(cityId))
  }

  removeFromFavorite(cityId: number){
    // console.log(cityId)
    this.store.dispatch(new LoadRemoveFromFavorite(cityId))
  }

  createIconURL(icon: number): string {
    return "https://developer.accuweather.com/sites/default/files/" + (icon < 10 ? "0" : "") + icon + "-s.png";
  }

  getTemperature(temperature: number, mode: string){
    // console.log(mode)
    if(mode == 'celsius'){
      return Math.round(temperature) + '\xB0  c'
    }else{
      let fahrenheit = temperature*9/5 + 32;
      return Math.round(fahrenheit) + '\xB0  F'
    }
  }
}
