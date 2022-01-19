import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { AddcardService } from '../addcard.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  isLogin:boolean = false;
  constructor(private _AuthService:AuthService ,private _Router:Router ,private _AddcardService:AddcardService,private modalService: NgbModal) { 
  }
  @Input() data:any  ;
  @Input() type:string = '' ;
  baseUrl:string = `https://young-inlet-60328.herokuapp.com/api/type/images/`;
  closeResult = '';
  smallIfo:string = '' ;

  // imageUrl:string = `https://young-inlet-60328.herokuapp.com/api/movies/images/${this.data.image}` + ;
  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin = true ;
      }else{
        this.isLogin = false ;
      }
    })
    this.baseUrl = this.baseUrl.replace("type", this.type);    
    this.smallIfo = this.data.long_description.slice(0,24) + '...'
  }

  delete(id:any){
    console.log(this.type);
    
    this._AddcardService.deleteMovieOrProgram(id,this.type).subscribe((res)=>{
      alert('sucess');
      if(this.type == 'movies'){
        this._AddcardService.films = this._AddcardService.films.filter(e=> e.id != id);
        
        
      }
      // console.log(res);      
    //   this._AddcardService.getAllFilmsOrPrograms(this.type).subscribe((res)=>{
    //   alert('sucess');
    // });
    })
  }
  show(data:any){
    console.log(data);
    this._AuthService.formDataShow = data;
    this._Router.navigate(['/add',this.type,data.id]);
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
