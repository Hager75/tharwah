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
  // films:any[]=[
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة المل" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة المل" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة المل" , rate:'8.9'},
  // ]
  constructor(
    private _AuthService: AuthService,
    private _AddcardService: AddcardService
  ) {}

  ngOnInit(): void {
    // this._AddcardService.type = 'movies';
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
   this.sub = this._AddcardService.getAllFilmsOrPrograms(this.type).subscribe((res) => {
      this._AddcardService.films = res.data;
      this.films = this._AddcardService.films;
      console.log(this.films);
      console.log(this._AddcardService.films);
    });
  }
  ngDoCheck():void{
    this.films = this._AddcardService.films;
    console.log(this.films);
    console.log(this._AddcardService.films);
  }
   ngOnDestroy(): void{
        this.sub.unsubscribe();
   }
}
