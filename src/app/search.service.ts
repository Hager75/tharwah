import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
filteredMovies = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }
      searchMovieOrProgram(title:string , type:string ):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}${type}/search/${title}`)
  };
}
