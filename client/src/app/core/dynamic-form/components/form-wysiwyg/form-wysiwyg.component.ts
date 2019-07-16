import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormElement } from '../formElement';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/core/crud.service';

@Component({
  selector: 'app-form-wysiwyg',
  templateUrl: './form-wysiwyg.component.html',
  styleUrls: ['./form-wysiwyg.component.scss']
})
export class FormWysiwygComponent extends FormElement implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;
  editor;

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
    // imageUploadURL: `${environment.endpoint}/widgets/images`,
    events: {
      'image.beforeUpload': (img, editor, e) => {
        console.log(e, editor, img);
        const formData = new FormData();

        formData.append('image', img[0]);
        formData.append('title', img[0].name);
        formData.append('imageTitle', 'image title');
        formData.append('imageAlt', 'image alt');
        
        console.log(this.editor.image.get())

      }
    }
  }

  ngOnInit() {
    this.config.options = this.mergeOptions(this.config.options, this.defaultOptions);
    console.log(this.config.options);

    if (this.config.value) {
      this.group.controls[this.config.name].setValue(this.config.value);
    }
  }

  getError() {
    return null;
  }

  initializeLink(controls) {
    controls.initialize();
    this.editor = controls.getEditor();
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