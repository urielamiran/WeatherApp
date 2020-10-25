import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { AutoColmpleteTableComponent } from './auto-colmplete-table/auto-colmplete-table.component';

import { HomeComponent } from './home/home.component';

import { FavoriteLocationsComponent } from './favorite-locations/favorite-locations.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './state-management/effect';
import * as fromApp from './app.reducer';
import {storageMetaReducer} from './storage.neta-reducer';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const routes : Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'favorite-locations', component: FavoriteLocationsComponent},
    {path: '**', redirectTo: '/home' , pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    FavoriteLocationsComponent,
    LoadingSpinnerComponent,
    AutoColmpleteTableComponent,
    HomeComponent
  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    FormsModule,
    MatAutocompleteModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(fromApp.appReducer, 
      { 
        metaReducers: [storageMetaReducer] 
      }
    ),
    EffectsModule.forRoot([WeatherEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
