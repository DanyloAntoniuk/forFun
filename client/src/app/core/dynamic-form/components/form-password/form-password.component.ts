import { Component, OnInit } from '@angular/core';
import { FormElement } from '../formElement';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormGroupDirective, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// @TODO use real password field name
const PASWORD_FIELD_NAME = 'password';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss']
})
export class FormPasswordComponent extends FormElement implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  formGroupDirective: FormGroupDirective;

  ngOnInit() {
    if (this.config.type === 'confirmPassword') {
      this.group.setValidators(this.checkPasswordsMatch());
    }
  }

  checkPasswordsMatch(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const password = group.controls[PASWORD_FIELD_NAME];
      const confirmPassword = group.controls[this.config.name];
  
      if (confirmPassword.errors && !confirmPassword.errors.notMatch) {
        return;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notMatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }

  getError(): string {
    if (this.config.type === 'password') {
      if (this.errors && this.errors.minlength) {
        return `${this.label} must be at least ${this.errors.minlength.requiredLength} characters long`;
      }
    } else {
      if (this.errors && this.errors.notMatch) {
        return `Passwords do not match`;
      }
    }

    return super.getRequiredError();
  }
}
