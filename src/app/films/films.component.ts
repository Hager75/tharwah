import { AddcardService } from './../addcard.service';
import { Component, OnInit , OnDestroy  } from '@angular/core';
import { AuthService } from './../auth.service';
import { SearchService } from './../search.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
})
export class FilmsComponent implements OnInit , OnDestroy  {
  isLogin: boolean = false;
  films: any;
  type:string ='movies';
  sub:any;
  noFilms:boolean = false;
  totalItem:number =  0;
  paginationError:boolean = false;
  page = 1;
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
        this.noFilms = false;
        console.log(this.films); 
      }else if (this._SearchService.filteredMovies.getValue() == null && this._SearchService.filteredFlag.getValue().hasOwnProperty('error')){
        this.noFilms = true;
      }
      else{
         this.films = this._AddcardService.films.getValue();
        this.noFilms = false;

      }
    })
  }

   ngOnDestroy(): void{
        this.sub.unsubscribe();
   }
      displayMovies(pageNum:number){
        this.sub = this._AddcardService.getAllFilmsOrPrograms(this.type , pageNum).subscribe((res) => {
      // this._AddcardService.films = res.data;
      this._AddcardService.films.next(res.data)  ;
      // this.hh = res.data;
      this.totalItem = res.meta.total;
      if(res.error){
        this.paginationError = true ;
      }
       this._AddcardService.films.subscribe((res)=>{
      this.films = this._AddcardService.films.getValue();

      });
    });
   }
  //  displayMovies(pageNum:number){
  //       this.sub = this._AddcardService.getAllFilmsOrPrograms(this.type , pageNum).subscribe((res) => {
  //     this._AddcardService.films = res.data;
  //     this.hh = res.data;
  //     console.log(res);
  //     this.totalItem = res.meta.total;
  //     if(res.error){
  //       this.paginationError = true ;
  //     }
  //     this.films = this._AddcardService.films;
  //   });
  //  }

}
