import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatIconModule, MatSnackBar } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule, HttpClientModule,
    MatToolbarModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule

  ],

  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatDividerModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule, MatDividerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule
  ],
})
export class AppMaterialModule { }
