import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Injectable, Type } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AppMaterialModule } from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';


import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateNoteComponent } from './component/create-note/create-note.component'; 



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SideNavComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    CreateNoteComponent,
    
    
    
    
  
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    MatSnackBarModule
    

  

  ],

  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
