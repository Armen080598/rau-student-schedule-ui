import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from './app.routing';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {DataService} from "./data.service";
import {FacultyPortfolioComponent} from "./faculty-portfolio/faculty-portfolio.component";
import {StudentPortfolioComponent} from "./student-portfolio/student-portfolio.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {StudentComponent} from "./student/component/student.component";
import {ContainerComponent} from "./student/component/container/container.component";
import {FacultyPopupComponent} from "./faculty-popup/faculty-popup.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {StudentPopupComponent} from "./student-popup/student-popup.component";


@NgModule({
  declarations: [
    AppComponent,
    FacultyPortfolioComponent,
    StudentPortfolioComponent,
    StudentComponent,
    ContainerComponent,
    FacultyPopupComponent,
    StudentPopupComponent
  ],
  imports: [
    BrowserModule,
    routing,
    DragDropModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DataService],
  entryComponents: [FacultyPopupComponent, StudentPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
