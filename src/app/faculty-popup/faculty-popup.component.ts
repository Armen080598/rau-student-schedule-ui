import {AfterViewInit, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DataService} from "../data.service";
import {first} from "rxjs/internal/operators";

@Component({
  selector: "faculty-popup",
  templateUrl: "faculty-popup.component.html",
  styleUrls: ["faculty-popup.component.css"]
})
export class FacultyPopupComponent implements AfterViewInit {

  public facultyName: string = "";
  private _fileUpload: HTMLInputElement;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              public dialogRef: MatDialogRef<FacultyPopupComponent>,
              private dataService: DataService) {
  }

  public file: File;

  ngAfterViewInit(){
    this._fileUpload = document.getElementById('upload') as HTMLInputElement;
    this._fileUpload.onchange = () => {
      this.file = this._fileUpload.files[0];
    };
  }

  addAction(){
    if(this.file && this.facultyName && this.facultyName.trim()){
      this.dataService.addFaculty(this.file, this.facultyName).pipe(first()).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelAction(){
    this.dialogRef.close();
  }
}
