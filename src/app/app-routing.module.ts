import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginComponent } from './views/login/login.component';
import { CoursesComponent } from './views/courses/courses.component';
import { StudentProfileComponent } from './views/student-profile/student-profile.component';
import { CourseProfileComponent } from './views/course-profile/course-profile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: ToolbarComponent,
    children: [
      { path: '', component: CoursesComponent },
      {
        path: 'students',
        component: HomePageComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
  { path: 'courseProfile/:comision', component: CourseProfileComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'profile/:id', component: StudentProfileComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
