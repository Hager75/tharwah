import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl} from '@angular/forms';
import { SearchService } from './../search.service';
import { ActivatedRoute ,Router ,NavigationStart, Event as NavigationEvent} from '@angular/router';
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
  constructor(private _AuthService:AuthService ,private _SearchService:SearchService,private router: Router, private _ActivatedRoute:ActivatedRoute) { 

    this.event$ =this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if(event instanceof NavigationStart) {  
              this.type = event.url.substring(1);
            }
          });
         
          
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
    },(error=>{}))
  }
searchItems(searchForm:FormGroup){
  if(searchForm.valid){

    
    if(this.type == 'movies' || this.type == ''){
      this.type = 'movies' ;
    this._SearchService.searchMovieOrProgram(searchForm.value.search , this.type).subscribe((response)=>{
      if(response.data){
      this._SearchService.filteredMovies.next(response.data);
      }else if (response.error){
        this._SearchService.filteredMovies.next(null);
           this._SearchService.filteredFlag.next(response);
      }
      
    },(error=>{}))
    }else if (this.type == 'programs'){
    this._SearchService.searchMovieOrProgram(searchForm.value.search , this.type).subscribe((response)=>{
      if(response.data){
      this._SearchService.filteredPrograms.next(response.data);
      
      }else if (response.error){
        this._SearchService.filteredPrograms.next(null);
           this._SearchService.filteredFlagPro.next(response);
      }
      
    },(error=>{}))
    }

  }
}
resetItems($event:any){

if(!$event.target.value){
  this._SearchService.filteredMovies.next(null);
   this._SearchService.filteredFlag.next({});
     this._SearchService.filteredPrograms.next(null);
   this._SearchService.filteredFlagPro.next({});
}
}

}
