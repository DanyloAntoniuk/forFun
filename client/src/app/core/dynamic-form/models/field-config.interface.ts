import { ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  errorStateMatcher?: ErrorStateMatcher,
  name: string,
  options?: string[],
  placeholder?: string,
  type: string,
  validation?: ValidatorFn[],
  value?: any
}
