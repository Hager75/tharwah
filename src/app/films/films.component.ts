import { AddcardService } from './../addcard.service';
import { Component, OnInit , OnDestroy , DoCheck } from '@angular/core';
import { AuthService } from './../auth.service';
import { SearchService } from './../search.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit , OnDestroy , DoCheck {
  isLogin: boolean = false;
  films: any;
  type:string ='movies';
  sub:any;
  totalItem:number =  0;
  paginationError:boolean = false;
  page = 1;
hh:any;
  constructor(
    private _AuthService: AuthService,
    private _AddcardService: AddcardService,private _SearchService:SearchService
  ) {}

  ngOnInit(): void {
 
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
this.displayMovies(1);

       this._SearchService.filteredMovies.subscribe(()=>{
      if(this._SearchService.filteredMovies.getValue() != null){
        this.films = this._SearchService.filteredMovies.getValue();
        console.log(this.films); 
      }else{
         this.films = this.hh;
      }
    })
  }
  ngDoCheck():void{
    // this.films = this._AddcardService.films;    
  }
   ngOnDestroy(): void{
        this.sub.unsubscribe();
   }
   displayMovies(pageNum:number){
        this.sub = this._AddcardService.getAllFilmsOrPrograms(this.type , pageNum).subscribe((res) => {
      this._AddcardService.films = res.data;
      this.hh = res.data;
      console.log(res);
      this.totalItem = res.meta.total;
      if(res.error){
        this.paginationError = true ;
      }
      this.films = this._AddcardService.films;
    });
   }

}
