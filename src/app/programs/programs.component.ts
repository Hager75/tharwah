import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AddcardService } from './../addcard.service';
import { SearchService } from './../search.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  isLogin:boolean = false;
    type:string ='programs';
    programs: any;
  sub:any;
  noPrograms:boolean = false;
  totalItem:number = 0 ;
  paginationError:boolean = false;
    page = 1;

    constructor(private _AuthService:AuthService, private _AddcardService:AddcardService,private _SearchService:SearchService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin = true ;
      }else{
        this.isLogin = false ;
      }
    })

    this.displayPrograms(1);
       this._SearchService.filteredPrograms.subscribe(()=>{
      if(this._SearchService.filteredPrograms.getValue() != null){
        this.programs = this._SearchService.filteredPrograms.getValue();
        this.noPrograms = false;
      }else if (this._SearchService.filteredPrograms.getValue() == null && this._SearchService.filteredFlagPro.getValue().hasOwnProperty('error')){
        this.noPrograms = true;
      }
      else{
         this.programs = this._AddcardService.programs.getValue();
        this.noPrograms = false;

      }
    })
  }
  // ngDoCheck():void{
  //     this.programs = this._AddcardService.programs;
  // }
   ngOnDestroy(): void{
        this.sub.unsubscribe();
   }

      displayPrograms(pageNum:number){
        this.sub = this._AddcardService.getAllFilmsOrPrograms(this.type , pageNum).subscribe((res) => {
      this._AddcardService.programs.next(res.data)  ;
      this.totalItem = res.meta.total;
      if(res.error){
        this.paginationError = true ;
      }
       this._AddcardService.programs.subscribe((res)=>{
      this.programs = this._AddcardService.programs.getValue();

      },(error=>{}));
    },(error=>{}));
   }

}
