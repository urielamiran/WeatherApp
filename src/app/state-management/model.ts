
export class DailyForecast {
  date?: string;
  dayIcon?:number;
  nightIcon?: number;
  dayPhrase?: string;
  nightPhrase?: string;
  maxTemp?: number;
  minTemp?: number;

  constructor(date?: string, dayIcon?:number, nightIcon?: number,  dayPhrase?: string, nightPhrase?: string,
    maxTemp?: number, minTemp?: number ){
      this.date = date;
      this.dayIcon = dayIcon;
      this.nightIcon = nightIcon;
      this.dayPhrase = dayPhrase;
      this.nightPhrase = nightPhrase;
      this.maxTemp = maxTemp;
      this.minTemp = minTemp
    }
}


export class Location{
  id?: number;
  city?: string;
  country?: string;
  celsius?: number;
  fahrenheit?: number
  icon?: number;
  info?: string;
  fiveDaysForecast?: DailyForecast[];
  isFavorite?: boolean;

  constructor(id?: number, city?: string, country?: string, celsius?: number, fahrenheit?: number, icon?:  number, info?: string,
    isFavorite?: boolean,  fiveDaysForecast?: DailyForecast[]){
      this.id = id;
      this.city = city;
      this.country = country;
      this.celsius = celsius;
      this.fahrenheit = fahrenheit;
      this.icon = icon;
      this.info = info;
      this.isFavorite = isFavorite;
      this.fiveDaysForecast = []
      if(fiveDaysForecast != undefined){
        fiveDaysForecast.forEach(forecast =>{
          this.fiveDaysForecast.push(new DailyForecast(forecast.date, forecast.dayIcon, forecast.nightIcon,
            forecast.dayPhrase, forecast.nightPhrase, forecast.maxTemp, forecast.minTemp))
        });
      }
  }

}