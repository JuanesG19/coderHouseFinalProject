import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './modules/angular-material.module';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './views/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RegisterModalComponent } from './components/register-student-modal/register-modal.component';
import { CoursesComponent } from './views/courses/courses.component';
import { RegisterCourseModalComponent } from './components/register-course-modal/register-course-modal.component';
import { FirebaseModule } from './modules/firebase.module';
import { StudentProfileComponent } from './views/student-profile/student-profile.component';
import { AddCourseModalComponent } from './components/add-course-modal/add-course-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LayoutComponent,
    LoginComponent,
    ToolbarComponent,
    RegisterModalComponent,
    CoursesComponent,
    RegisterCourseModalComponent,
    StudentProfileComponent,
    AddCourseModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FirebaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
