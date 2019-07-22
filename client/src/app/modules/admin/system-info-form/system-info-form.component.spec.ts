import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInfoFormComponent } from './system-info-form.component';

describe('SystemInfoFormComponent', () => {
  let component: SystemInfoFormComponent;
  let fixture: ComponentFixture<SystemInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
