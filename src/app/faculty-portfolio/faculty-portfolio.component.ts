import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {DataService} from "../data.service";
import {first} from "rxjs/internal/operators";
import {Route, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {FacultyPopupComponent} from "../faculty-popup/faculty-popup.component";

@Component({
  selector: 'faculty-portfolio',
  templateUrl: './faculty-portfolio.component.html',
  styleUrls: ['./faculty-portfolio.component.css']
})
export class FacultyPortfolioComponent implements OnInit {

  public faculties: any[] = [];
  public displayedColumns = ["name", "delete"];

  constructor(private dataService: DataService,
              private router: Router,
              private matDialog: MatDialog) {

  }

  ngOnInit() {
    this.getFaculties();
  }

  getFaculties(){
    this.dataService.getFaculties().pipe(first()).subscribe(res => {
      this.faculties = res;
    });
  }

  navigateToStudents(faculty: any) {
    this.router.navigateByUrl(`faculty/${faculty.id}`)
  }

  delete(faculty: any) {
    this.dataService.deleteFaculty(faculty.id).subscribe(() => {
      this.faculties = this.faculties.filter(i => i !== faculty);
    });
  }

  openFacultyPopup(){
    this.matDialog.open(FacultyPopupComponent, this.getDialogConfig()).beforeClosed().subscribe(res => {
      if(res){
        this.getFaculties();
      }
    });
  }

  getDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "auto";
    dialogConfig.width = "450px";
    return dialogConfig;
  }
}
