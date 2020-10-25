import { Action } from '@ngrx/store';

import {Location} from '../state-management/model'


export enum ActionTypes {
  

    LoadLocationsSuccess = '[Location] Load Locations Success',
    LoadLocations = '[Location] Load Locations',
    LoadLocationsFail = '[Location] Load Locations Fail',

    LoadAutoComplete = '[Location] Load Auto Complete',
    LoadAutoCompleteSuccess = '[Location] Load Auto Complete Success',
    LoadAutoCompleteFail = '[Location] Load Auto Fail',

    LoadLocationDataSuccess = '[Location] Load Location Data Success',
    LoadLocationData = '[Location] Load Location Data',
    LoadLocationDataFail = '[Location] Load Location Data Fail',

    LoadAddToFavoriteSuccess = '[Location] Load Add To Favorite Success',
    LoadAddToFavorite = '[Location] Load Add To Favorite',
    LoadAddToFavoriteFail = '[Location] Load Add To Favorite Fail',

    LoadRemoveFromFavoriteSuccess = '[Location] Load Remove From Favorite Success',
    LoadRemoveFromFavorite = '[Location] Load Remove From Favorite',
    LoadRemoveFromFavoriteFail = '[Location] Load Remove From Favorite Fail',

    LoadCelsiusMode = '[Location] Load Celsius Mode',
    LoadFahrenheitMode = '[Location] Load Fahrenheit Mode'
}


//autoCompleteLocations
export class LoadLocationsSuccess implements Action {
    readonly type = ActionTypes.LoadLocationsSuccess;

    constructor(public payload: Location[]) {}
}

export class LoadLocations implements Action {
    readonly type = ActionTypes.LoadLocations;
    constructor(public payload: string) {}
}

export class LoadLocationsFail implements Action {
    readonly type = ActionTypes.LoadLocationsFail;

    constructor(public payload: string) {}
}

///Location
export class LoadLocationDataSuccess implements Action {
    readonly type = ActionTypes.LoadLocationDataSuccess;

    constructor(public payload:  {id: number, city: string, country: string, location: Location }) {}
}

export class LoadLocationData implements Action {
    readonly type = ActionTypes.LoadLocationData;

    constructor(public payload:{id: number, city: string, country: string }) {}
}

export class LoadLocationDataFail implements Action {
    readonly type = ActionTypes.LoadLocationDataFail;
    constructor(public payload: string) {}
}




export class LoadAddToFavoriteSuccess implements Action {
    readonly type = ActionTypes.LoadAddToFavoriteSuccess;

    constructor(public payload: number) {}
}

export class LoadAddToFavorite implements Action {
    readonly type = ActionTypes.LoadAddToFavorite;

    constructor(public payload: number) {}
}

export class LoadAddToFavoriteFail implements Action {
    readonly type = ActionTypes.LoadAddToFavoriteFail;
    constructor(public payload: string) {}
}




export class LoadRemoveFromFavoriteSuccess implements Action {
    readonly type = ActionTypes.LoadRemoveFromFavoriteSuccess;

    constructor(public payload: number) {}
}

export class LoadRemoveFromFavorite implements Action {
    readonly type = ActionTypes.LoadRemoveFromFavorite;

    constructor(public payload: number) {}
}

export class LoadRemoveFromFavoriteFail implements Action {
    readonly type = ActionTypes.LoadRemoveFromFavoriteFail;
    constructor(public payload: string) {}
}

export class LoadCelsiusMode implements Action{
    readonly type = ActionTypes.LoadCelsiusMode;
}

export class LoadFahrenheitMode implements Action{
    readonly type = ActionTypes.LoadFahrenheitMode;
}

export class LoadAutoComplete implements Action{
    readonly type = ActionTypes.LoadAutoComplete;
    constructor(public payload: Location[]) {}
}


export class LoadAutoCompleteSuccess implements Action{
    readonly type = ActionTypes.LoadAutoCompleteSuccess;
    constructor(public payload: Location[]) {}
}

export class LoadAutoCompleteFail implements Action{
    readonly type = ActionTypes.LoadAutoCompleteFail;
    constructor(public payload: string) {}
}


export type ActionsUnion = 
    LoadLocationsSuccess | LoadLocations | LoadLocationsFail |
    LoadLocationDataSuccess | LoadLocationData | LoadLocationDataFail |
    LoadAddToFavoriteSuccess | LoadAddToFavorite | LoadAddToFavoriteFail | 
    LoadRemoveFromFavoriteSuccess | LoadRemoveFromFavorite | LoadRemoveFromFavoriteFail |

    LoadAutoComplete | LoadAutoCompleteSuccess | LoadAddToFavoriteFail |
    LoadCelsiusMode | LoadFahrenheitMode;
