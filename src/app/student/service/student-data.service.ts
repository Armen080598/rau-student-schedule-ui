import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";
import {ResponseModel} from "../model/ResponseModel";

@Injectable()
export class StudentDataService {

  constructor(private http: HttpClient) {

  }

  public getSemesterFromNumber(semesterNumber: number): string {
    const semester = (semesterNumber % 2 === 0) ? 2 : 1;
    return `КУРС ${Math.ceil(semesterNumber / 2)} Семестер ${semester}`;
  }

  processData(res: ResponseModel[]) {
    return res.sort((a,b) => +a.semester - (+b.semester)).reduce((acc, item) => {
      const index = acc.findIndex(setItem => setItem.semester === item.semester);
      if(index === -1) {
        acc.push({
          semester: item.semester,
          disciplines: [item.discipline]
        });
      } else {
        acc[index].disciplines.push(item.discipline);
      }
      return acc;
    }, []).map(item => {
      item.sem = this.getSemesterFromNumber(+item.semester);
      return item;
    });
  }

  public saveData(data: any): Observable<any> {
    const requestObject: ResponseModel =
      data.flatMap((dataItem: any) => {
        return dataItem.disciplines.map((discipline: any) => {
            return {
              semester: dataItem.semester,
              discipline: discipline
            }
        });
      });
    return this.http.post(`${this.backendUrl}/update`, JSON.stringify(requestObject), {headers: this.headers});
  }

  public uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.backendUrl}/xml`, formData).pipe(map((res: ResponseModel[])=> {
      return this.processData(res);
    }));
  }

  get headers(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    return headers.append('content-type', 'application/json')
  }

  get backendUrl(): string {
    return 'http://localhost:8080';
  }
}
