import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// we know that response will be in JSON format
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudentService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:8000/students';

  // Uses http.get() to load data
  getStudents() {
    return this.http.get(this.uri);
  }

   // Get student by ID
   getStudentById(studentId: string) {
    return this.http.get(`${this.uri}/${studentId}`);
  }

  // Uses http.post() to post data
  addStudents(firstName: string, lastName: string) {
    return this.http.post(this.uri, { firstName, lastName });
  }

  // Update Student details
  updateStudent(studentId: string, firstName: string, lastName: string) {
    return this.http.put(`${this.uri}/${studentId}`, { firstName, lastName });
  }

  deleteStudent(studentId: string) {
    return this.http.delete(`${this.uri}/${studentId}`);
  }
}
