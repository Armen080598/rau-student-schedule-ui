import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StudentComponent} from "./component/student.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CommonModule} from "@angular/common";
import {routing} from "./student.routing";
import {RouterModule} from "@angular/router";
import {ContainerComponent} from "./component/container/container.component";
import {StudentDataService} from "./service/student-data.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    StudentComponent,
    ContainerComponent
  ],
  imports: [
    DragDropModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    routing
  ],
  providers: [StudentDataService],
  bootstrap: [StudentComponent]
})
export class StudentModule { }
