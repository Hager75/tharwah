import { Component, OnInit } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  event$:Subscription ;
  toggle:boolean = true ; 
  loginToggle:boolean = false ; 
  url:string='';
  constructor(private router: Router) {

    this.event$
    =this.router.events
        .subscribe(
          (event: NavigationEvent) => {
            if(event instanceof NavigationStart) {  
              this.url = event.url ;
            }
          });
   }

  ngOnInit(): void {

  }

  checkUrl():boolean{
    if(this.url.includes("/carddetails")  || this.url == '/ElfanArtWWeathTharwah/login' || this.url.includes('/add')){
      this.toggle = false;      
      return this.toggle ;
    }
    return this.toggle = true ;
  }
  toggalFooter():boolean{
    if(this.url == "/ElfanArtWWeathTharwah/login"){  
      return false ;
    }
    return true ;
  }
}
