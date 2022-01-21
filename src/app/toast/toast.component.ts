import { Component, OnInit } from '@angular/core';
// import { ToastService } from './toast-service';
import { ToastService } from './../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(public _ToastService: ToastService) { }

  ngOnInit(): void {
  }
 showStandard() {
    this. _ToastService.show('I am a standard toast');
  }

  showSuccess() {
    this. _ToastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  // showDanger(dangerTpl) {
  //   this. _ToastService.show(dangerTpl:any, { classname: 'bg-danger text-light', delay: 15000 });
  // }
}


