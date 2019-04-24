import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

@Injectable()
export class StudentDataService {

  constructor(private http: HttpClient) {

  }

  public getSemesterFromNumber(semesterNumber: number): string {
    const semester = (semesterNumber % 2 === 0) ? 2 : 1;
    return `КУРС ${Math.ceil(semesterNumber / 2)} Семестер ${semester}`;
  }

  processData(res: any[]) {
    return res.sort((a,b) => a.Semester - b.Semester).reduce((acc, item) => {
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
      item.Sem = this.getSemesterFromNumber(+item.Semester);
      return item;
    });
  }

  public uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.backendUrl}/xml`, formData).pipe(map(res => {
      return this.processData(res);
    }));
  }

  get backendUrl(): string {
    return 'http://localhost:8080';
  }
}
