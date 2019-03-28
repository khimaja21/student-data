import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  public students;
  constructor(private studentSVC: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentSVC.getStudents().subscribe(
      data => {
        this.students = data;
      },
      err => console.error(err),
      () => console.log('finished loading')
    );
  }

  onDelete(studentId: string) {
    this.studentSVC.deleteStudent(studentId).subscribe(() => {
      console.log('Deleted:' + studentId);
      this.getStudents();
    });
  }
}
