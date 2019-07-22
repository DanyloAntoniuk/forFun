import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import 'froala-editor/js/plugins.pkgd.min.js';

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { TestComponent } from '../test/test.component';
import { MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormEmailComponent } from './components/form-email/form-email.component';
import { FormPasswordComponent } from './components/form-password/form-password.component';
import { FormWysiwygComponent } from './components/form-wysiwyg/form-wysiwyg.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormFileUploadComponent } from './components/form-file-upload/form-file-upload.component';
import { FormDatePickerComponent } from './components/form-date-picker/form-date-picker.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
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
    FormFileUploadComponent,
    FormDatePickerComponent,
    FormCheckboxComponent,
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
    FormFileUploadComponent,
    FormDatePickerComponent,
  ]
})
export class DynamicFormModule {}
