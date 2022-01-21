import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData = new BehaviorSubject(null) ;
formDataShow:any = null ;
  constructor(private _HttpClient:HttpClient, private _Router:Router) { 
    if(localStorage.getItem('userToken') != null){
      this.saveUserData();
    }
  }
  
  login(formData:object):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}login`, formData)
  }
  saveUserData(){
    // let encodedUserData = JSON.stringify(localStorage.getItem('userToken')) ;
    // this.userData = jwtDecode(encodedUserData);
    
    let encodedUserData:any = JSON.stringify(localStorage.getItem('userToken'));
    // this.userData = jwtDecode(encodedUserData); 
    this.userData.next(encodedUserData); 
    // this.userData.next(jwtDecode(encodedUserData));  
    console.log(this.userData);
    
  }
  logOut():Observable<any>{
    let tempToken = localStorage.getItem('userToken');
    localStorage.removeItem('userToken');
    this.userData.next(null);
    console.log(tempToken);
    
    // this._Router.navigate(['/movies']);
    return this._HttpClient.get(`${environment.apiUrl}logout`,{
      headers:{
        Authorization: 'Bearer ' + tempToken,
      },
    })
  }
}
