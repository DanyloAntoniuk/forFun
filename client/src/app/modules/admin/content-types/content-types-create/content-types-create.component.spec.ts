import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypesCreateComponent } from './content-types-create.component';

describe('ContentTypesCreateComponent', () => {
  let component: ContentTypesCreateComponent;
  let fixture: ComponentFixture<ContentTypesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTypesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
