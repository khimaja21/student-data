import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { StudentService } from './student.service';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NewStudentFormComponent } from './new-student-form/new-student-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListStudentsComponent } from './list-students/list-students.component';

const appRoutes: Routes = [
  {
    path: '', // default component to display
    component: ListStudentsComponent
  },
  {
    path: 'addStudent', // when students added
    component: NewStudentFormComponent
  },
  {
    path: 'editStudent/:_id', // To edit students records
    component: NewStudentFormComponent
  },
  {
    path: 'listStudents', // To lists students records
    component: ListStudentsComponent
  },

  {
    path: '**', // when path cannot be found
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NewStudentFormComponent,
    NavigationMenuComponent,
    NotFoundComponent,
    ListStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
