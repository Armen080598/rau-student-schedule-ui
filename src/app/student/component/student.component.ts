import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {StudentDataService} from "../service/student-data.service";
import {first} from "rxjs/internal/operators";

@Component({
  selector: 'student-form',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements AfterViewInit{
  public allData = [];

  constructor(private studentService: StudentDataService) {

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

  }

  private _fileUpload: HTMLInputElement;

  ngAfterViewInit() {
    this._fileUpload = document.getElementById('upload') as HTMLInputElement;
    this._fileUpload.onchange = () => {
      this.studentService.uploadFile(this._fileUpload.files[0]).pipe(first()).subscribe(res => {
        this.allData = res;
      });
    };
    /*this.studentService.getStudentData().pipe(first()).subscribe(res => {
      this.allData = res;
    });*/
  }
}
