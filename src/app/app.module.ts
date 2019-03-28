import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material';
import { StudentService } from './student.service';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NewStudentFormComponent } from './new-student-form/new-student-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListStudentsComponent } from './list-students/list-students.component';
// import { CanActivate } from '@angular/router/src/utils/preactivation';

const appRoutes: Routes = [{
  path: '',                     // default component to display
  component: ListStudentsComponent,
 // CanActivate: [CanActivateRouteGuard],
// runGuardsAndResolvers: 'Always',
},

{
  path: 'addStudent',         // when students added
  component: NewStudentFormComponent
},
{
  path: 'editStudent/:_id',         // To edit students records
  component: NewStudentFormComponent
},
{
  path: 'listStudents',         // To lists students records
  component: ListStudentsComponent
},

{
  path: '**',                 // when path cannot be found
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
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
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

export class AppModule { }
