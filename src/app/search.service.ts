import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
filteredMovies = new BehaviorSubject(null);
filteredPrograms = new BehaviorSubject(null);
filteredFlag = new BehaviorSubject<object>({});
filteredFlagPro = new BehaviorSubject<object>({});
  constructor(private _HttpClient:HttpClient) { }
      searchMovieOrProgram(title:string , type:string ):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}${type}/search/${title}`)
  };
}
