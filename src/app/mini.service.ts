
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MiniService {

    defaultCity = new BehaviorSubject({id: 215854, city: 'Tel Aviv', country: 'Israel'})

}