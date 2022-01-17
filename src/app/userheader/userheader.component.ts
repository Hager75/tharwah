import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {
  @Input() url:string = '';
  isLogin:boolean = false;
  constructor(private _AuthService:AuthService) { 
  }

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
      console.log(response);
    })
// this._AuthService.logOut();
  }

}
