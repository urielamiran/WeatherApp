import { ActionsUnion, ActionTypes } from './actions';
import {Location} from '../state-management/model'

export interface State {
  locations: Location[];
  autoComplete: Location[];
  favorites: Location[];
  location: Location;
 
  error: any;
  celsiusMode: string;
}

const initialState: State = {
  locations: [],
  autoComplete: [],
  favorites: [],
  location: null,
 
  error: null,
  celsiusMode: 'celsius'
}


function getUnique(arr, comp) {

  // store the comparison  values in array
const unique =  arr.map(e => e[comp])

// store the indexes of the unique objects
.map((e, i, final) => final.indexOf(e) === i && i)

// eliminate the false indexes & return unique objects
.filter((e) => arr[e]).map(e => arr[e]);

return unique;
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  if(a != undefined && b != undefined){
    const bandA = a.city.toUpperCase();
  const bandB = b.city.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
  }
}


export function WeatherReducer(state = initialState, action: ActionsUnion) {
  let location;
  switch (action.type) {
    case ActionTypes.LoadLocationsSuccess:
   
      return {
        ...state,
        locations: [...getUnique([...state.locations, ...action.payload],'id')],
        autoComplete: [...[...action.payload].sort(compare)],
        error: null
      }

    case ActionTypes.LoadAutoCompleteSuccess:
 
      return {
        ...state,
        autoComplete: [...[...action.payload].sort(compare)]
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
        celsiusMode: 'celsius'
      } 

    case ActionTypes.LoadFahrenheitMode:
      return {
        ...state,
        celsiusMode: 'fahrenheit'
      } 


    default:
      return {
        ...state,
        error: null,
        celsiusMode: 'celsius'
      };
  }
}
