import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StudentComponent} from "./component/student.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {routing} from "./student.routing";
import {RouterModule} from "@angular/router";
import {ContainerComponent} from "./component/container/container.component";


@NgModule({
  declarations: [
    StudentComponent,
    ContainerComponent
  ],
  imports: [
    DragDropModule,
    CommonModule,
    RouterModule,
    routing
  ],
  providers: [],
  bootstrap: [StudentComponent]
})
export class StudentModule { }
