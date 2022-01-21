import { AddcardService } from './../addcard.service';
import { Component, OnInit , OnDestroy , DoCheck } from '@angular/core';
import { AuthService } from './../auth.service';


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
  totalItem:number = 1 ;
  paginationError:boolean = false;
  page = 1;

  constructor(
    private _AuthService: AuthService,
    private _AddcardService: AddcardService
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
  }
  ngDoCheck():void{
    this.films = this._AddcardService.films;    
  }
   ngOnDestroy(): void{
        this.sub.unsubscribe();
   }
   displayMovies(pageNum:number){
        this.sub = this._AddcardService.getAllFilmsOrPrograms(this.type , pageNum).subscribe((res) => {
      this._AddcardService.films = res.data;
      console.log(res);
      if(res.error){
        this.paginationError = true ;
      }
      this.films = this._AddcardService.films;
    });
   }
}
