import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { TestComponent } from '../test/test.component';
import { MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { FormEmailComponent } from './components/form-email/form-email.component';
import { FormPasswordComponent } from './components/form-password/form-password.component';
import { FormWysiwygComponent } from './components/form-wysiwyg/form-wysiwyg.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(), 
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormEmailComponent,
    TestComponent,
    FormPasswordComponent,
    FormWysiwygComponent,
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [
    DynamicFieldDirective,
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormEmailComponent,
    FormPasswordComponent,
    FormWysiwygComponent,
  ]
})
export class DynamicFormModule {}
