import { AddcardService } from './../addcard.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.css']
})
export class CarddetailsComponent implements OnInit {
id:string = '';
objectDetails:any={};
type:string = '';
baseUrl:string = `https://young-inlet-60328.herokuapp.com/api/${this.type}/images/`;
  constructor(private _ActivatedRoute:ActivatedRoute , private _AddcardService:AddcardService) { }

  ngOnInit(): void {
    console.log(this._AddcardService.type);
    
    if(this._AddcardService.type != ''){
      this.type = this._AddcardService.type;
      console.log(this.type);
    }
this.id=this._ActivatedRoute.snapshot.params.id;
console.log(this.id);

this._AddcardService.getDetails(this.id ,this.type).subscribe((response)=>{
  console.log(response.data);
  
  this.objectDetails = response.data;
})
  }

}
