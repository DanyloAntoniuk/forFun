import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Field } from '../../models/field.interface';

@Component({
  selector: 'app-form-file-upload',
  templateUrl: './form-file-upload.component.html',
  styleUrls: ['./form-file-upload.component.scss']
})
export class FormFileUploadComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
  imgURL: string | ArrayBuffer;
  fileName: string;
  loading = true;

  ngOnInit() {
    if (this.config.options && this.config.options.fileURL) {
      this.fileName = this.config.options.fileName;
      this.imgURL = this.config.options.fileURL;
    }
  }

  onLoad() {
    this.loading = false;
  }

  // Display image after upload
  previewImage(files: FileList) {
    if (files.length) {
      const reader = new FileReader();
      this.fileName = files[0].name;

      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  // Clear input and remove image from DOM
  clearFile(file: HTMLInputElement) {
    file.value = '';
    this.fileName = '';
    this.imgURL = '';
  }
}
