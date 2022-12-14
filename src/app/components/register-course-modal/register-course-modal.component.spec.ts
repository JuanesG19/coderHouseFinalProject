import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCourseModalComponent } from './register-course-modal.component';

describe('RegisterCourseModalComponent', () => {
  let component: RegisterCourseModalComponent;
  let fixture: ComponentFixture<RegisterCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCourseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
