import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicContentTypeComponent } from './dynamic-content-type.component';

describe('DynamicContentTypeComponent', () => {
  let component: DynamicContentTypeComponent;
  let fixture: ComponentFixture<DynamicContentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicContentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
