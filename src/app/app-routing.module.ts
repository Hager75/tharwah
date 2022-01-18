import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddcardComponent } from './addcard/addcard.component';
import { LoginComponent } from './login/login.component';
import { CarddetailsComponent } from './carddetails/carddetails.component';
import { FilmsComponent } from './films/films.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
  {
    path:'', redirectTo:'movies', pathMatch:"full"
  },
  {
  path:'movies', component:FilmsComponent
},
{
  path:'programs', component:ProgramsComponent
},
  {
  path:'carddetails/:type/:id', component:CarddetailsComponent
},
  {
  path:'login', component:LoginComponent
},
  {
  path:'add/:type',canActivate:[AuthGuard] ,component:AddcardComponent
},
  {
  path:'add/:type/:id',canActivate:[AuthGuard] ,component:AddcardComponent
},
{path: '**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
