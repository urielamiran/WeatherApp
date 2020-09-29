import { ActionReducerMap } from '@ngrx/store';
import * as fromLocation from './state-management/reducer';

export interface AppState {
  locations: fromLocation.State
}

export const appReducer: ActionReducerMap<AppState> = {
  locations: fromLocation.WeatherReducer
};
