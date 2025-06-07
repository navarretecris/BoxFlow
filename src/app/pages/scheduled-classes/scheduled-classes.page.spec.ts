import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledClassesPage } from './scheduled-classes.page';

describe('ScheduledClassesPage', () => {
  let component: ScheduledClassesPage;
  let fixture: ComponentFixture<ScheduledClassesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledClassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
