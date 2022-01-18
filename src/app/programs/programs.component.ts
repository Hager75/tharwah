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

  // programs:any[]=[
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  //   {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  // ]
  constructor(private _AuthService:AuthService, private _AddcardService:AddcardService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin = true ;
      }else{
        this.isLogin = false ;
      }
    })
    this._AddcardService.getAllFilmsOrPrograms(this.type).subscribe((res)=>{
      this.programs = res.data;
      console.log(this.type);
      
      
    })
  }


}
