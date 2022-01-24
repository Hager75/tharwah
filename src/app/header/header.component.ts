import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean = false;

  constructor(private _AuthService:AuthService,public _Router: Router) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin = true ;
      }else{
        this.isLogin = false ;
      }
    })
  }
  logOut(){
    this._AuthService.logOut().subscribe((response)=>{
          this._Router.navigate(['/movies']);

    },(error=>{}))
// this._AuthService.logOut();
  }

}
