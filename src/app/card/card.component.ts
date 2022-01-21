import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { AddcardService } from '../addcard.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  isLogin:boolean = false;
    show:boolean = false;
  constructor(private _AuthService:AuthService ,private _Router:Router ,private _AddcardService:AddcardService,private modalService: NgbModal,
  private toastr: ToastrService) { 
  }
  @Input() data:any  ;
  @Input() type:string = '' ;
  baseUrl:string = `${environment.apiUrl}type/images/`;
  closeResult = '';
  smallIfo:string = '' ;
gg:any[]=[];
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
     
      this.show = true;
      if(this.type == 'movies'){
        this._AddcardService.getAllFilmsOrPrograms(this.type , 1).subscribe((res) => {
      this._AddcardService.films.next(res.data) ;
this.toastr.success('تمت العملية بنجاح', 'success', {timeOut:3000, closeButton: true, progressBar: true});
});
        // this._AddcardService.films = this._AddcardService.films.filter(e=> e.id != id);
        // this.gg = this._AddcardService.films.getValue();
        // console.log(this.gg);
        
      // this.ggh = this.gg.filter(e=> e.id != id));
        // this._AddcardService.films.next(this._AddcardService.films.getValue().filter(e=> e.id != id));
        // this._AddcardService.films.next(this._AddcardService.films.getValue()?.filter(e=> e.id != id));
      }else if (this.type == 'programs'){
                this._AddcardService.getAllFilmsOrPrograms(this.type , 1).subscribe((res) => {
      this._AddcardService.programs.next(res.data) ;
this.toastr.success('تمت العملية بنجاح', 'success', {timeOut:3000, closeButton: true, progressBar: true});
});
        // this._AddcardService.programs = this._AddcardService.programs.filter(e=> e.id != id);
        // this._AddcardService.programs = this._AddcardService.programs.filter(e=> e.id != id);
      }
      // console.log(res);      
    //   this._AddcardService.getAllFilmsOrPrograms(this.type).subscribe((res)=>{
    //   alert('sucess');
    // });
    })
  }
  showItem(data:any){
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
