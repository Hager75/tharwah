import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddcardService {
type:string = '';
films:any[]=[];
programs:any[]=[];
  constructor(private _HttpClient:HttpClient) { }
  addFilmOrProgram(formData:FormData , type:string):Observable<any>{
    return this._HttpClient.post(`https://young-inlet-60328.herokuapp.com/api/${type}`, formData)
  };
  // https://yourwebsite.com/api/v1/users/$id?_method=PUT
  getAllFilmsOrPrograms(type:string):Observable<any>{
    return this._HttpClient.get(`https://young-inlet-60328.herokuapp.com/api/${type}`)
  };
  getDetails(id:string , type:string):Observable<any>{
    return this._HttpClient.get(`https://young-inlet-60328.herokuapp.com/api/${type}/${id}`)
  };
  deleteMovieOrProgram(id:object , type:string):Observable<any>{
    return this._HttpClient.delete(`https://young-inlet-60328.herokuapp.com/api/${type}/${id}`)
  };
  updateMovieOrProgram(id:object , type:string , formData:FormData ):Observable<any>{
    return this._HttpClient.post(`https://young-inlet-60328.herokuapp.com/api/${type}/${id}`, formData)
  };
}
