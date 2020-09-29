import {Component, OnInit } from '@angular/core';
import * as fromApp from '../app.reducer'
import {Location} from '../state-management/model'
import {Observable, of} from 'rxjs';
import { Store } from '@ngrx/store';
import { LoadAddToFavorite, LoadLocationData, LoadLocations, LoadRemoveFromFavorite } from '../state-management/actions';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  locations$: Observable<Location[]>;
  locationData$ : Observable<Location>;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  deafultCity: {id: number, city: string, country: string} = {id: 215854, city: 'Tel Aviv', country: 'Israel'}
  showWeatherBox : boolean = true;
  isLoading: boolean = true;
  isCelsiusMode: boolean = true;
  str: string = "search for city...";



  constructor(private store: Store<fromApp.AppState>){}
  ngOnInit() {
    this.store.select('locations').subscribe( state => {

      this.locations$ = of(state.locations);
      this.locationData$ = of(state.location);
      this.locationData$.subscribe(() =>{
        this.isLoading = false;
      }); 

      of(state.isCelsiusMode).subscribe(isCelsiusMode =>{
        this.isCelsiusMode = isCelsiusMode;
      });

      if(state.location == null){
        this.store.dispatch(new LoadLocationData(this.deafultCity));
      }
    });

  }

  
  getDayName(day: string){
    let dayCode = new Date(day).getDay();
    return this.days[dayCode];
  }
  
  showLocationWeather(id : number, city: string, country: string){
    this.store.dispatch(new LoadLocationData({id: id, city: city, country: country}))
    this.isLoading = true
    this.showWeatherBox = !this.showWeatherBox;
    this.str = city ;
  }

  searchForCity(str: string){
    if(str != ''){
      this.store.dispatch(new LoadLocations(str))
    }

  }

  addToFavorite(cityId: number){
    console.log(cityId)
    this.store.dispatch(new LoadAddToFavorite(cityId))
  }

  removeFromFavorite(cityId: number){
    console.log(cityId)
    this.store.dispatch(new LoadRemoveFromFavorite(cityId))
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
