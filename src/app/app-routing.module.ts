import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';




const Routes: Routes = [ 

{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{path: 'forgotpassword', component: ForgetpasswordComponent},
{path: 'resetpassword/:id', component: ResetpasswordComponent,pathMatch: 'prefix'},
{
  path: 'homepage', component: HomeComponent,
  children:
    [
      { path: 'create-note' , component :CreateNoteComponent },
     
      {
        path: '',
        redirectTo: 'create-note',
        pathMatch: 'full'
      }
    ]
},


{ path: '**', redirectTo: 'login',pathMatch: 'full'}]

// otherwise redirect to home

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
