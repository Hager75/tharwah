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
flg= new BehaviorSubject<boolean>(false);
programs= new BehaviorSubject([]);

  constructor(private _HttpClient:HttpClient) { }
  addFilmOrProgram(formData:FormData , type:string):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}${type}`, formData)
  };
  getAllFilmsOrPrograms(type:string , pageNum:number):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}${type}`,{params: {page: pageNum}}
    )
  };
  getDetails(id:string , type:string):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}${type}/${id}`)
  };
  deleteMovieOrProgram(id:object , type:string):Observable<any>{
    const formData = new FormData();
    formData.append('_method','delete'); 
    return this._HttpClient.post(`${environment.apiUrl}${type}/${id}`, formData);
  };
  updateMovieOrProgram(id:string , type:string , formData:FormData ):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}${type}/${id}`, formData)
  };

}
