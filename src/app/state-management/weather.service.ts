import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import {Location, DailyForecast} from './model'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = "yZkKlxztP6SG1gcVygwVC5lflPitzBBc";
  // private apiKey = "RoxxSq40yy88xQrUNRNM4wNS2GlHy5r2"
  private baseURL = "https://dataservice.accuweather.com/";
  private positionAPI = "/locations/v1/cities/";
  private conditionAPI = "/currentconditions/v1/";
  private forecastAPI = "/forecasts/v1/daily/5day/";
  constructor(private http: HttpClient) {}

  getLocations(payload: string): Observable<Location[]> {
    return this.http
      .get<Location[]>(`${this.baseURL}${this.positionAPI + "autocomplete"}?apikey=${this.apiKey}&q=${payload}`)
      .pipe(
        map((positionKeys: Location[]) =>
          positionKeys.map(position => ({
            id: JSON.parse(position["Key"]),
            city: position["LocalizedName"],
            country: position["Country"]["LocalizedName"],          
          }))
        )
      )
  }

 
  help(forecasts: any[]){
    let forecastArray: DailyForecast[] = [];
    forecasts.forEach(forecast =>{
      forecastArray.push(new DailyForecast(forecast["Date"], forecast["Day"]["Icon"], forecast["Night"]["Icon"], forecast["Day"]["IconPhrase"],
      forecast["Night"]["IconPhrase"], forecast["Temperature"]["Maximum"].Value, forecast["Temperature"]["Minimum"].Value ))
    })
    return forecastArray;
  }

  getWeatherData(id: number): Observable<Location> {
    let s = []
   return forkJoin({
      currentWeather: this.http.get(`${this.baseURL}${this.conditionAPI}${id}?apikey=${this.apiKey}&details=false`),
      weatherForecast: this.http.get(`${this.baseURL}${this.forecastAPI}${id}?apikey=${this.apiKey}&details=false&metric=${true}`  )
    }).pipe(map(value => ({
      celsius: value.currentWeather[0].Temperature.Metric.Value,
      fahrenheit: value.currentWeather[0].Temperature.Imperial.Value,  
      info: value.currentWeather[0].WeatherText,
      icon: value.currentWeather[0].WeatherIcon,
      fiveDaysForecast: this.help(value.weatherForecast["DailyForecasts"])
    })))
  }

}