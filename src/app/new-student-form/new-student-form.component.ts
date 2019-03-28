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
  @Input() firstName: string;
  @Input() lastName: string;
  mode = 'add';
  private id: string;
  public studentRecord;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _myService: StudentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');
        this._myService.getStudentById(this.id).subscribe(
          // read data and assign to public variable students
          data => {
            this.studentRecord = JSON.parse(JSON.stringify(data));
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
    /* console.log("You submitted: " + this.firstName + " " + this.lastName);
     this._myService.addStudents(this.firstName, this.lastName); */
    if (this.mode === 'add') {
      this._myService.addStudents(this.firstName, this.lastName);
    }
    if (this.mode === 'edit') {
      this._myService.updateStudent(this.id, this.firstName, this.lastName);
    }

    this.router.navigate(['/listStudents']);
  }
}
