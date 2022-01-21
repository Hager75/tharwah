import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AddcardService {
type:string = '';
films= new BehaviorSubject([]);
programs= new BehaviorSubject(null);
// films:any[]=[];
// programs:any[]=[];
// orignalFilms:any[]=[];
// orignalPrograms:any[]=[];
  constructor(private _HttpClient:HttpClient) { }
  addFilmOrProgram(formData:FormData , type:string):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}${type}`, formData)
  };
  // https://yourwebsite.com/api/v1/users/$id?_method=PUT
  getAllFilmsOrPrograms(type:string , pageNum:number):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}${type}`,{params: {page: pageNum}})
  };
  getDetails(id:string , type:string):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}${type}/${id}`)
  };
  deleteMovieOrProgram(id:object , type:string):Observable<any>{
    return this._HttpClient.delete(`${environment.apiUrl}${type}/${id}`)
  };
  updateMovieOrProgram(id:string , type:string , formData:FormData ):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}${type}/${id}`, formData)
  };

}
