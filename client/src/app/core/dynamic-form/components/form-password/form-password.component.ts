import { Component, OnInit } from '@angular/core';
import { FormElement } from '../formElement';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// @TODO use real password field name
const PASWORD_FIELD_NAME = 'password';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss']
})
export class FormPasswordComponent extends FormElement implements OnInit{
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;

  ngOnInit() {
    if (this.config.type === 'confirmPassword') {
      //this.group.get(this.config.name).setValidators([...this.config.validation, this.checkPasswordsMatch(this.group)]);
      //this.group.get(this.config.name).updateValueAndValidity();
      this.group.get(this.config.name).setAsyncValidators(this.checkPasswordsMatch(this.group));
      this.group.get(this.config.name).updateValueAndValidity();
    }
  }

  checkPasswordsMatch(group) {
    return (control: AbstractControl) => {
      //const password = group.value[PASWORD_FIELD_NAME];

      return group.valueChanges.pipe(
        map((data) => {
          console.log(data, control);
          if (control.value && data[PASWORD_FIELD_NAME] !== control.value) {
            return of({ notMatch: true });
          }
        }));
    }
  }

  getError(): string {
    if (this.config.type === 'password') {
      if (this.errors && this.errors.minlength) {
        return `${this.label} must be at least ${this.errors.minlength.requiredLength} characters long`;
      }
    } else {
      console.log(this.errors);
      if (this.errors && this.errors.notMatch) {
        return `Passwords do not match`;
      }
    }

    return super.getRequiredError();
  }
}
