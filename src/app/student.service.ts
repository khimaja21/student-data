import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// we know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudentService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

   uri = 'http://localhost:8000/students';

  // Uses http.get() to load data
  getStudents() {
    return this.http.get(this.uri);
  }

  // Uses http.post() to post data
  addStudents(firstName: string, lastName: string) {
    this.http.post(this.uri, { firstName, lastName })
      .subscribe((responseData) => {
        console.log(responseData);
      });

  }

  // Get student by ID
  getStudentById(studentId: string) {
   return this.http.get(`${this.uri}/${studentId}`);
  }

  // Update Student details
  updateStudent(studentId: string, firstName: string, lastName: string) {
    this.http.put(`${this.uri}/${studentId}`, { firstName, lastName })
      .subscribe(() => {
        console.log('Updated: ' + studentId);
      });
  }

  deleteStudent(studentId: string) {
    this.http.delete(`${this.uri}/${studentId}`)
      .subscribe(() => {
        console.log('Deleted: ' + studentId);
      });
  }
}
