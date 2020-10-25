import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadLocationData } from '../state-management/actions';
import * as fromApp from '../app.reducer'
import {Observable, of} from 'rxjs';
import {Location} from '../state-management/model'
import { Output } from '@angular/core';

@Component({
  selector: 'auto-colmplete-table',
  templateUrl: './auto-colmplete-table.component.html',
  styleUrls: ['./auto-colmplete-table.component.css']
})
export class AutoColmpleteTableComponent implements OnInit {

  @Output() showWeather = new EventEmitter<boolean>()
  @Input() weather$ : Observable<{autoComplete: Location[]}>

  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit(): void {
    this.weather$ = this.store.select('locations')
  }

  showLocationWeather(id : number, city: string, country: string){
    this.store.dispatch(new LoadLocationData({id: id, city: city, country: country}))
    this.showWeather.emit(true)
  }

}
