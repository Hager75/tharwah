import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors: string = '';
  login:FormGroup = new FormGroup({
    name:new FormControl(null, [Validators.required]),
    password:new FormControl(null, [Validators.required]),
  });
  constructor(public _AuthService :AuthService  , public _Router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('userToken') != null){
      this._Router.navigate(['movies']);

    }
  }
  submitLoginForm(login: FormGroup) {
    if (login.valid) {
      // console.log(login.value)
      this._AuthService.login(login.value).subscribe((response)=>{
        console.log(response.message);
        if(response.token){
        localStorage.setItem('userToken', response.token);
        // localStorage.setItem('userToken', 'true');
        this._AuthService.saveUserData();
      this._Router.navigate(['movies']);
    }
      },(error)=>{
        console.log(error);
        this.errors = error.error.message;

      })
    }
  }

}
