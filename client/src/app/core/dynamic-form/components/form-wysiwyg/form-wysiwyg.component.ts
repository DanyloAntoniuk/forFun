import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormElement } from '../formElement';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/core/crud.service';
import { FroalaEditorDirective } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-form-wysiwyg',
  templateUrl: './form-wysiwyg.component.html',
  styleUrls: ['./form-wysiwyg.component.scss']
})
export class FormWysiwygComponent extends FormElement implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
  editor: any;

  constructor(private crudService: CrudService) {
    super();
  }

  private readonly defaultOptions = {
    toolbarButtons: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'fontSize',
      'textColor',
      'paragraphFormat',
      'backgroundColor',
      'quote',
      'formatOL',
      'formatUL',
      'insertTable',
      'insertImage',
      'insertVideo',
      'insertLink',
      'html',
    ],
    quickInsertTags: [],
    charCounterCount: false,
    imageUpload: true,
    events: {
      'image.beforeUpload': (img: FileList) => {
        const formData = new FormData();

        formData.append('image', img[0]);
        formData.append('title', img[0].name);

        this.crudService.createRecord(formData, `${environment.endpoint}/widgets/images`).subscribe(res => {
          this.editor.image.insert(res.image.path, null, null, img[0]);
        });

        // Prevent further image processing.
        return false;
      },
    }
  }

  // Init froala editor
  froalaInit(e: {[key: string]: any}) {
    e.initialize();
    this.editor = e.getEditor();
  }

  ngOnInit() {
    this.config.options = this.mergeOptions(this.config.options, this.defaultOptions);

    if (this.config.value) {
      this.group.controls[this.config.name].setValue(this.config.value);
    }
  }

  getError() {
    return null;
  }

  // Merge user provided options for froala editor with default options(partial deep merge)
  private mergeOptions(providedOptions: {[key: string]: any}, defaultOptions: {[key: string]: any}) {
    const options = Object.assign({}, defaultOptions);
  
    for (const key in providedOptions) {
      // If option is an array merge arrays without duplicates.
      if (Array.isArray(providedOptions[key])) {
        // Merge arrays
        options[key] = defaultOptions[key].concat(
          providedOptions[key].filter(
            // Filter duplicate values.
            (option: string) => defaultOptions[key].indexOf(option) < 0)
          );
      // If option is primitive replace default option with provided.
      } else {
        if (providedOptions[key]) {
          options[key] = providedOptions[key];
        }
      }
    }
  
    return options;
  }
}