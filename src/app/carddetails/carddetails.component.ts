import { AddcardService } from './../addcard.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.css']
})
export class CarddetailsComponent implements OnInit {
id:string = '';
objectDetails:any={};
type:string = '';
closeResult = '';
baseUrl:string = `${environment.apiUrl}type/images/`;
  constructor(private _ActivatedRoute:ActivatedRoute , private _AddcardService:AddcardService,private modalService: NgbModal , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
     this.type = this._ActivatedRoute.snapshot.params.type;
        this.baseUrl = this.baseUrl.replace("type", this.type);    



this.id=this._ActivatedRoute.snapshot.params.id;

this._AddcardService.getDetails(this.id ,this.type).subscribe((response)=>{
  
  this.objectDetails = response.data;
},(error=>{}))
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
