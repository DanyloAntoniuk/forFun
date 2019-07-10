import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormElement } from '../formElement';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Field } from '../../models/field.interface';

@Component({
  selector: 'app-form-file-upload',
  templateUrl: './form-file-upload.component.html',
  styleUrls: ['./form-file-upload.component.scss']
})
export class FormFileUploadComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
  imgURL: string | ArrayBuffer;

  previewImage(files) {
    if (files.length) {
      const reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }
}
