import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-student-form',
  templateUrl: './new-student-form.component.html',
  styleUrls: ['./new-student-form.component.css']
})
export class NewStudentFormComponent implements OnInit {
  @Input() public firstName: string;
  @Input() public lastName: string;
  private mode = 'add';
  private id: string;
  public studentRecord;

  constructor(
    private studentSVC: StudentService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');

        this.studentSVC.getStudentById(this.id).subscribe(
          // read data and assign to public variable students
          data => {
            this.studentRecord = data;
            this.firstName = this.studentRecord.firstName;
            this.lastName = this.studentRecord.lastName;
          },
          err => console.error(err),
          () => console.log('finished loading')
        );
      } else {
        this.mode = 'add';
        this.id = null;
      }
    });
  }

  onSubmit() {
    if (this.mode === 'add') {
      this.studentSVC
        .addStudents(this.firstName, this.lastName)
        .subscribe(responseData => {
          console.log(responseData);
          this.router.navigate(['/listStudents']);
        });
    }
    if (this.mode === 'edit') {
      this.studentSVC
        .updateStudent(this.id, this.firstName, this.lastName)
        .subscribe(responseData => {
          console.log(responseData);
          this.router.navigate(['/listStudents']);
        });
    }

  }
}
