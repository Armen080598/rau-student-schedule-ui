import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

@Injectable()
export class StudentDataService {

  constructor(private http: HttpClient) {

  }

  public getStudentData(): Observable<any> {
    return this.http.get(`http://localhost:8080/xml/latest`).pipe(map((res: any[]) => {
      return this.processData(res);
    }));
  }

  public getSemesterFromNumber(semesterNumber: number): string {
    return `КУРС ${Math.floor(semesterNumber / 2) + 1} Семестер ${7%2}`;
  }

  processData(res: any[]) {
    return res.reduce((acc, item) => {
      const index = acc.findIndex(setItem => setItem.Semester === item.Semester);
      if(index === -1) {
        acc.push({
          Semester: item.Semester,
          disciplines: [item.Discipline]
        });
      } else {
        acc[index].disciplines.push(item.Discipline);
      }
      return acc;
    }, []).map(item => {
      item.Sem = this.getSemesterFromNumber(item.Semester);
      return item;
    });
  }

  public uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`http://localhost:8080/xml`, formData).pipe(map(res => {
      return this.processData(res);
    }));
  }
}
