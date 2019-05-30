import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {first, map} from "rxjs/internal/operators";
import {ResponseModel} from "./student/model/ResponseModel";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  public getSemesterFromNumber(semesterNumber: number): string {
    const semester = (semesterNumber % 2 === 0) ? 2 : 1;
    return `КУРС ${Math.ceil(semesterNumber / 2)} Семестер ${semester}`;
  }

  processData(res: ResponseModel[]) {
    return res.sort((a, b) => +a.semester - (+b.semester)).reduce((acc, item) => {
      const index = acc.findIndex(setItem => setItem.semester === item.semester);
      if (index === -1) {
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

  get headers(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    return headers.append('content-type', 'application/json')
  }

  get backendUrl(): string {
    return 'http://localhost:8080';
  }

  public getFile(id: number) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'document';
    const url = `${this.backendUrl}/student/plan/${id}`;
    xhr.open('GET', url);
    xhr.overrideMimeType('text/xml');
    xhr.onload = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          let xmlText = new XMLSerializer().serializeToString(xhr.response);
          let blob = new Blob([xmlText], {type: 'text/plain'});
          let filename = "file.plm.xml";
          let pom = document.createElement('a');
          pom.setAttribute('href', window.URL.createObjectURL(blob));
          pom.setAttribute('download', filename);
          pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
          pom.click();
        }
      }
    };
    xhr.send(null);
  }

  public getFaculties(): Observable<any> {
    const url = `${this.backendUrl}/faculty/all`;
    return this.http.get(url);
  }

  public deleteFaculty(id: number): Observable<any> {
    const url = `${this.backendUrl}/faculty/${id}`;
    return this.http.delete(url);
  }

  public addFaculty(file: File, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return this.http.post(`${this.backendUrl}/faculty/add`, formData);
  }

  public getStudentsByFaculty(facultyId: number): Observable<any> {
    const url = `${this.backendUrl}/student/allStudents?facultyId=${facultyId}`;
    return this.http.get(url);
  }

  public getStudentDataById(studentId: number): Observable<any> {
    const url = `${this.backendUrl}/student/${studentId}`;
    return this.http.get(url).pipe(map((res: any) => {
      return this.processData(JSON.parse(res.plan));
    }))
  }

  public deleteStudent(id: number): Observable<any> {
    const url = `${this.backendUrl}/student/${id}`;
    return this.http.delete(url);
  }

  public addStudent(facultyId: number, firstName: String, lastName: string): Observable<any> {
    const body = {
      facultyId: facultyId,
      firstName: firstName,
      lastName: lastName
    };
    const url = `${this.backendUrl}/student/add`;
    return this.http.post(url, body);
  }

  public updateStudent(id: number, data: any): Observable<any> {
    const plan: ResponseModel = data.flatMap((dataItem: any) => {
      return dataItem.disciplines.map((discipline: any) => {
        return {
          semester: dataItem.semester,
          discipline: discipline
        }
      });
    });
    const body = {
      id: id,
      plan: JSON.stringify(plan)
    };
    const url = `${this.backendUrl}/student/update`;
    return this.http.put(url, body);
  }


}
