import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl} from '@angular/forms';
import { SearchService } from './../search.service';


@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {
  @Input() url:string = '';
  isLogin:boolean = false;
    searchForm:FormGroup = new FormGroup({
    search:new FormControl(null),
  });
  constructor(private _AuthService:AuthService ,private _SearchService:SearchService) { 
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
searchItems(searchForm:FormGroup){
  if(searchForm.valid){
    console.log(searchForm.value);
    this._SearchService.searchMovieOrProgram(searchForm.value.search , 'movies').subscribe((response)=>{
      console.log(response.data);
      this._SearchService.filteredMovies.next(response.data);
      
    })
  }
}
resetItems($event:any){
  console.log($event.target.value);
  
if($event.target.value == ''){
  this._SearchService.filteredMovies.next(null);
  console.log(this._SearchService.filteredMovies.getValue());
  
}
}
}
