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
      this._AuthService.login(login.value).subscribe((response)=>{
        if(response.token){
        localStorage.setItem('userToken', response.token);
        this._AuthService.saveUserData();
      this._Router.navigate(['movies']);
    }
      },(error)=>{
        this.errors = 'اسم المستخدم او كلمة المرور خاطئة';

      })
    }
  }

}
