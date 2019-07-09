import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWysiwygComponent } from './form-wysiwyg.component';

describe('FormWysiwygComponent', () => {
  let component: FormWysiwygComponent;
  let fixture: ComponentFixture<FormWysiwygComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWysiwygComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWysiwygComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
