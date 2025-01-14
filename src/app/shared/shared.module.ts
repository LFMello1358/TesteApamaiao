import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatHeaderRowDef } from '@angular/material/table';
import { MatRowDef } from '@angular/material/table';
import { MatHeaderCellDef } from '@angular/material/table';
import { MatCellDef } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from "@angular/forms";
import { MatRippleModule } from '@angular/material/core';






@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    MatRippleModule

  ],
  exports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    MatRippleModule



  ],
  // Aqui você adiciona o serviço
  providers: [

  ],
})
export class SharedModule { }
