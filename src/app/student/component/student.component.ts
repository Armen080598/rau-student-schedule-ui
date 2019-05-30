import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {StudentDataService} from "../service/student-data.service";
import {first} from "rxjs/internal/operators";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
  selector: 'student-form',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, AfterViewInit{
  public allData: any[] = [];

  public dataIsLoaded: boolean;
  private studentId: number;

  constructor(private route: ActivatedRoute,private dataService: DataService) {

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      this.dataService.getStudentDataById(this.studentId).subscribe(res => {
        this.allData = res;
      })
    });
  }

  ngAfterViewInit() {
    /*this._fileUpload = document.getElementById('upload') as HTMLInputElement;
    this._fileUpload.onchange = () => {
      this.studentService.uploadFile(this._fileUpload.files[0]).pipe(first()).subscribe((res: any[]) => {
        this.dataIsLoaded = true;
        this.allData = res;
      });
    };*/
  }

  public saveData() {
    this.dataService.updateStudent(this.studentId, this.allData).subscribe( );
  }
}
