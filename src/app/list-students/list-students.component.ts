import { Component, OnInit, OnChanges } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit, OnChanges {
  public students;
  // initialize the call using StudentService
  constructor(private _myService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  ngOnChanges() {
    this.getStudents();
  }

  getStudents() {
    this._myService.getStudents().subscribe(
      data => {
        this.students = data;
      },
      err => console.error(err),
      () => console.log('finished loading')
    );
  }

  onDelete(studentId: string) {
    this._myService.deleteStudent(studentId);
  }
}
