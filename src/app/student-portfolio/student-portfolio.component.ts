import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../data.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {StudentPopupComponent} from "../student-popup/student-popup.component";

@Component({
  selector: 'student-portfolio',
  templateUrl: './student-portfolio.component.html',
  styleUrls: ['./student-portfolio.component.css']
})
export class StudentPortfolioComponent implements OnInit{

  private facultyId: number;
  private students: any[] = [];

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router,
              private matDialog: MatDialog){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.facultyId = +params['id'];
      this.getStudents();
    });
  }

  getStudents(){
    this.dataService.getStudentsByFaculty(this.facultyId).subscribe(res => {
      this.students = res;
    });
  }

  navigateToStudent(student: any){
    this.router.navigateByUrl(`student/${student.id}`);
  }

  downloadFile(student: any) {
    this.dataService.getFile(student.id);
  }

  deleteStudent(student: any){
    this.dataService.deleteStudent(student.id).subscribe(() => {
      this.students = this.students.filter(i => i !== student);
    });
  }

  openStudentPopup(){
    this.matDialog.open(StudentPopupComponent, this.getDialogConfig()).beforeClosed().subscribe(res => {
      if(res){
        this.getStudents();
      }
    });
  }

  getDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "auto";
    dialogConfig.width = "450px";
    dialogConfig.data = {
      facultyId: this.facultyId
    };
    return dialogConfig;
  }
}
