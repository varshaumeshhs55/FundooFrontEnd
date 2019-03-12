import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';




const Routes: Routes = [ 

{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{path: 'home', component: HomeComponent},
{ path: '**', redirectTo: 'login',pathMatch: 'full'}]

// otherwise redirect to home
@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
