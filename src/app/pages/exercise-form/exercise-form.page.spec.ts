import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseFormPage } from './exercise-form.page';

describe('ExerciseFormPage', () => {
  let component: ExerciseFormPage;
  let fixture: ComponentFixture<ExerciseFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
