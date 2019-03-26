import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import { RetrieveNoteComponent } from './component/retrieve-note/retrieve-note.component';
import { MainNotesComponent } from './component/main-notes/main-notes.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { SearchNoteComponent } from './component/search-note/search-note.component';
import { RemainderComponent } from './component/remainder/remainder.component';




const Routes: Routes = [ 

{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{path: 'forgotpassword', component: ForgetpasswordComponent},
{path: 'resetpassword/:id', component: ResetpasswordComponent,pathMatch: 'prefix'},
{
  path: 'home', component: HomeComponent,
  children:
    [
      { path: 'main-note' , component :MainNotesComponent },
      { path: 'retrive-note' , component :RetrieveNoteComponent },
      { path: 'archive', component: ArchiveComponent},
      { path: 'trash', component: TrashComponent},
      { path: 'search', component: SearchNoteComponent},
      { path: 'remainder', component: RemainderComponent},

      {
        path: '',
        redirectTo: 'main-note',
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
