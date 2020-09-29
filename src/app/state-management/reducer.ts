import { ActionsUnion, ActionTypes } from './actions';
import {Location} from '../state-management/model'

export interface State {
  locations: Location[];
  favorites: Location[];
  location: Location;
  error: any;
  isCelsiusMode: boolean;
}

const initialState: State = {
  locations: [],
  favorites: [],
  location: null,
  error: null,
  isCelsiusMode: true
}

export function WeatherReducer(state = initialState, action: ActionsUnion) {
  let location;
  switch (action.type) {
    case ActionTypes.LoadLocationsSuccess:
      return {
        ...state,
        locations: [...action.payload],
        error: null
      }

    case ActionTypes.LoadLocationDataSuccess:
      location = action.payload.location;
      let updatedLocation: Location = new Location(action.payload.id, action.payload.city, action.payload.country,
       location.celsius, location.fahrenheit, location.icon, location.info,
        state.favorites.find(item => item.id == action.payload.id) != undefined? true: false, location.fiveDaysForecast)
      
      return {
        ...state,
        locations: [...state.locations.filter(item => item.id !== action.payload.id), updatedLocation],
        location: updatedLocation,
        error: null
      } 

    case ActionTypes.LoadAddToFavoriteSuccess: 
      location = state.locations.find(item => item.id == action.payload)
      let favoriteAddedLocation: Location = new Location(location.id, location.city, location.country, location.celsius,
        location.fahrenheit, location.icon, location.info, true, location.fiveDaysForecast)

      return {
        ...state,
        location: favoriteAddedLocation,
        favorites: [...state.favorites, favoriteAddedLocation],
        locations: [...state.locations.filter(item => item.id !== action.payload), favoriteAddedLocation],
        error: null
      }


    case ActionTypes.LoadRemoveFromFavoriteSuccess:
      location = state.locations.find(item => item.id == action.payload);

      let favoriteRemovedLocation : Location = new Location(location.id, location.city, location.country, location.celsius,
        location.fahrenheit, location.icon, location.info, false, location.fiveDaysForecast);

      return {
        ...state,
        location: favoriteRemovedLocation,
        locations: [...state.locations.filter(item => item.id !== action.payload), favoriteRemovedLocation],
        favorites: [...state.favorites.filter(item => item.id !== action.payload)],
        error: null
      }

    case ActionTypes.LoadLocationsFail:
    case ActionTypes.LoadAddToFavoriteFail:
    case ActionTypes.LoadRemoveFromFavoriteFail:
    case ActionTypes.LoadLocationDataFail:
      return {
        ...state,
        error : action.payload
      };

    case ActionTypes.LoadCelsiusMode:
      return {
        ...state,
        isCelsiusMode: true
      } 

    case ActionTypes.LoadFahrenheitMode:
      return {
        ...state,
        isCelsiusMode: false
      } 


    default:
      return {
        ...state,
        error: null
      };
  }
}
