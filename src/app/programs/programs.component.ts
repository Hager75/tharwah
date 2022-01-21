import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AddcardService } from './../addcard.service';

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
  totalItem:number = 1 ;
  paginationError:boolean = false;
    page = 1;

    constructor(private _AuthService:AuthService, private _AddcardService:AddcardService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin = true ;
      }else{
        this.isLogin = false ;
      }
    })
    // this._AddcardService.getAllFilmsOrPrograms(this.type , 1).subscribe((res)=>{
    //   this.programs = res.data;
    //   console.log(this.programs);
      
      
    // })
    this.displayPrograms(1);

  }
  ngDoCheck():void{
      this.programs = this._AddcardService.programs;
  }
   ngOnDestroy(): void{
        this.sub.unsubscribe();
   }
     displayPrograms(pageNum:number){
        this.sub = this._AddcardService.getAllFilmsOrPrograms(this.type , pageNum).subscribe((res) => {
      this._AddcardService.programs = res.data;
      console.log(res);
      if(res.error){
        this.paginationError = true ;
      }
      this.programs = this._AddcardService.programs;
    });
   }


}
