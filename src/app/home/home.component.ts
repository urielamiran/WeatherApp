import {Component, OnDestroy, OnInit } from '@angular/core';
import * as fromApp from '../app.reducer'
import {Location} from '../state-management/model'
import {Observable, Subscription} from 'rxjs';
import {  Store } from '@ngrx/store';
import {  LoadAutoComplete, LoadLocationData, LoadLocations } from '../state-management/actions';
import { MiniService } from '../mini.service';

@Component({
  selector: 'app-weather-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription : Subscription;
  showWeatherBox : boolean = true;
  weather$ : Observable<{locations: Location[], location: Location}>;

  constructor(private store: Store<fromApp.AppState>, private miniService: MiniService){}
  ngOnInit() {
      this.subscription = this.miniService.defaultCity.subscribe(deafultCity =>{
      this.store.dispatch(new LoadLocationData(deafultCity));
      
    })
    this.weather$ = this.store.select('locations')
  }

  loadCity(location: {id: number, city: string, country: string}){
    this.store.dispatch(new LoadLocationData(location));

  }

  searchForCity(str: string, locations: Location[]){
    let found = false;
    let autoCompleteArray = []
    locations.forEach(location =>{
     
      if(location.city && location.city.toLowerCase().includes(str.toLowerCase())){
        found = true
        autoCompleteArray.push(location)
      }
    })
    if(!found){
      this.store.dispatch(new LoadLocations(str))
    }else{
      this.store.dispatch(new LoadAutoComplete(autoCompleteArray))
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
