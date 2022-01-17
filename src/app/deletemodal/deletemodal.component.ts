import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeletemodalComponent implements OnInit {
  @Input() id:any  ;
  constructor() { }

  ngOnInit(): void {
    console.log(this.id);
    
  }

}
