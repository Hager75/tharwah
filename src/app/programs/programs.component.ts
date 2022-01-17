import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  isLogin:boolean = false;
  programs:any[]=[
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-4.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-2.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
    {title:'فيلم المؤسس الأول',imgUrl:'../../assets/b-3.png', info: "فيلم وثائقي عن حياة الملك" , rate:'8.9'},
  ]
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin = true ;
      }else{
        this.isLogin = false ;
      }
    })
  }

}
