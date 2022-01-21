import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl} from '@angular/forms';
import { SearchService } from './../search.service';
import {  Router ,NavigationStart, Event as NavigationEvent} from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {
  @Input() url:string = '';
    event$:Subscription ;

  type:string='';
  isLogin:boolean = false;
    searchForm:FormGroup = new FormGroup({
    search:new FormControl(null),
  });
  constructor(private _AuthService:AuthService ,private _SearchService:SearchService,private router: Router) { 

    this.event$ =this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if(event instanceof NavigationStart) {  
              this.type = event.url.substring(1);
              console.log(this.type);
              this.clearInput()
            }
          });
  }

  ngOnInit(): void {
    console.log(this.type);
    
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
searchItems(searchForm:FormGroup){
  if(searchForm.valid){
    console.log(searchForm.value);
    if(this.type == 'movies'){
    this._SearchService.searchMovieOrProgram(searchForm.value.search , this.type).subscribe((response)=>{
      if(response.data){
      this._SearchService.filteredMovies.next(response.data);
      }else if (response.error){
        this._SearchService.filteredMovies.next(null);
           this._SearchService.filteredFlag.next(response);
      }
      
    })
    }else if (this.type == 'programs'){
    this._SearchService.searchMovieOrProgram(searchForm.value.search , this.type).subscribe((response)=>{
      if(response.data){
      this._SearchService.filteredPrograms.next(response.data);
      console.log(response);
      
      }else if (response.error){
        this._SearchService.filteredPrograms.next(null);
           this._SearchService.filteredFlagPro.next(response);
      }
      
    })
    }

  }
}
resetItems($event:any){
  console.log($event.target.value);

if(!$event.target.value){
  this._SearchService.filteredMovies.next(null);
   this._SearchService.filteredFlag.next({});
     this._SearchService.filteredPrograms.next(null);
   this._SearchService.filteredFlagPro.next({});
}
}
clearInput(){
  return '';
}
}
