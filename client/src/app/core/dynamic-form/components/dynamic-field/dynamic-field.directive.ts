import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

import { FormButtonComponent } from '../form-button/form-button.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormEmailComponent } from '../form-email/form-email.component';
import { FormPasswordComponent } from '../form-password/form-password.component';
import { FormWysiwygComponent } from '../form-wysiwyg/form-wysiwyg.component';

// Available form field types.
const components: {[type: string]: Type<Field>} = {
  button: FormButtonComponent,
  text: FormInputComponent,
  select: FormSelectComponent,
  email: FormEmailComponent,
  password: FormPasswordComponent,
  confirmPassword: FormPasswordComponent,
  wysiwyg: FormWysiwygComponent,
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input() formGroupDirective: FormGroupDirective;

  @Input() config: FieldConfig;

  @Input() group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnChanges() {
    // Update form field component if config changed.
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    // Create new component instance.
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);

    // Assign values for component.
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.formGroupDirective = this.formGroupDirective;
  }
}
