import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {  Observable, of} from 'rxjs';
import {Action } from '@ngrx/store'
import {Location} from '../state-management/model'
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes, LoadAddToFavorite, LoadAddToFavoriteFail, LoadAddToFavoriteSuccess, LoadLocationData, LoadLocationDataFail, LoadLocationDataSuccess, LoadLocations, LoadLocationsFail, LoadLocationsSuccess, LoadRemoveFromFavorite, LoadRemoveFromFavoriteFail, LoadRemoveFromFavoriteSuccess } from './actions';
import { WeatherService } from './weather.service';

@Injectable()
export class WeatherEffects {
    constructor(
    private actions$: Actions,
    private weatherService: WeatherService
    ) {}
    
  @Effect() 
  loadLocatios$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LoadLocations),
    mergeMap((action: LoadLocations) =>
      this.weatherService.getLocations(action.payload).pipe(
        map((locations: Location[]) => {return new LoadLocationsSuccess(locations)}),
        catchError(() => of(new LoadLocationsFail('Failed to fetch Autocomplete of cities')))
      )
    )
  );    
   
  @Effect()
  loadLocationData$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LoadLocationData),
    map((action: LoadLocationData) => action.payload),
    mergeMap((val) =>
      this.weatherService.getWeatherData(val.id).pipe(
        map((location: Location) => new LoadLocationDataSuccess({ id: val.id, city: val.city, country: val.country, location: location })),
        catchError(() => of(new LoadLocationDataFail('Failed to fetch weather data of location from the server')))
      )
    )
  );


  @Effect()
  loadAddToFavorite$ : Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LoadAddToFavorite),
    map((action: LoadAddToFavorite) => new LoadAddToFavoriteSuccess(action.payload)),
      catchError(() => of(new LoadAddToFavoriteFail('Failed to add this location to the Favorite')))
  );

  @Effect()
  loadRemoveFromFavorite$ : Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LoadRemoveFromFavorite),
    map((action: LoadRemoveFromFavorite) => new LoadRemoveFromFavoriteSuccess(action.payload)),
      catchError(() => of(new LoadRemoveFromFavoriteFail('Failed to remove this location from the Favorite')))
  );

}