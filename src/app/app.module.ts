import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { ProgramsComponent } from './programs/programs.component';
import { FilmsComponent } from './films/films.component';
import { CarddetailsComponent } from './carddetails/carddetails.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddcardComponent } from './addcard/addcard.component';
import { HttpClientModule } from "@angular/common/http";
import { NotfoundComponent } from './notfound/notfound.component';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    CardComponent,
    UserheaderComponent,
    ProgramsComponent,
    FilmsComponent,
    CarddetailsComponent,
    LoginComponent,
    AddcardComponent,
    NotfoundComponent,
    DeletemodalComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
