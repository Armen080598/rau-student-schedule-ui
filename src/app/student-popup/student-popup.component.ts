import {AfterViewInit, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DataService} from "../data.service";
import {first} from "rxjs/internal/operators";

@Component({
  selector: "student-popup",
  templateUrl: "student-popup.component.html",
  styleUrls: ["student-popup.component.css"]
})
export class StudentPopupComponent{

  public firstName: string = "";
  public lastName: string = "";
  public facultyId: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              public dialogRef: MatDialogRef<StudentPopupComponent>,
              private dataService: DataService) {
    this.facultyId = data.facultyId;
  }

  addAction(){
    if(this.firstName && this.firstName.trim() && this.lastName && this.lastName.trim()){
      this.dataService.addStudent(this.facultyId, this.firstName, this.lastName).pipe(first()).subscribe(() => {
        this.dialogRef.close(true);
      });
    }

  }

  cancelAction(){
    this.dialogRef.close();
  }
}
