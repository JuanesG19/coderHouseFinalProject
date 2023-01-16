import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { AddCourseModalComponent } from './add-course-modal.component';

describe('AddCourseModalComponent', () => {
  let component: AddCourseModalComponent;
  let fixture: ComponentFixture<AddCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseModalComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
