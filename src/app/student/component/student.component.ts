import {AfterViewInit, Component} from '@angular/core';
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {StudentDataService} from "../service/student-data.service";
import {first} from "rxjs/internal/operators";

@Component({
  selector: 'student-form',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements AfterViewInit{
  public allData: any[] = [];

  public dataIsLoaded: boolean;

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
      this.studentService.uploadFile(this._fileUpload.files[0]).pipe(first()).subscribe((res: any[]) => {
        this.dataIsLoaded = true;
        this.allData = res;
      });
    };
  }

  public saveData() {
    this.studentService.saveData(this.allData).subscribe( res => {
      this.studentService.getFile();
    });
  }
}
