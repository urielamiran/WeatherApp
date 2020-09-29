import { Component, OnInit } from '@angular/core';
import * as fromApp from './app.reducer'
import { Store } from '@ngrx/store';
import { of} from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadCelsiusMode, LoadFahrenheitMode } from './state-management/actions';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDayMode: boolean = true
  isError : boolean = false;
  isCelsiusMode: boolean = true;
  err: string = ''

  constructor( private store: Store<fromApp.AppState>){}
  ngOnInit(){
    this.store.select('locations').subscribe(state =>{
      of(state.error).subscribe(err =>{
        if(err){
          this.err = err
          this.isError = true
          $('#errorModal').modal()
        }else{
          this.isError = false
        }    
      })
    })
  }


  toggleDayNight(){
    this.isDayMode = !this.isDayMode;

    if(this.isDayMode){
      document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPbhA4rbzKk9nu62Aiv10-1P_KROaR9v7HrA&usqp=CAU')"
    }else{
      document.body.style.backgroundImage = "url('data:image/jpeg;base64,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')"
    }  

  }

  toggleCelsiusFahrenheit(){
    this.isCelsiusMode = !this.isCelsiusMode;
    if(this.isCelsiusMode){
      this.store.dispatch(new LoadCelsiusMode)
    }
    else{
      this.store.dispatch(new LoadFahrenheitMode)
    }
  }

  
}