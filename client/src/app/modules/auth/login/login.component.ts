import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/shared/message.service';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hide = true;
  mainError: string;

  config: FieldConfig[] = [
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your email',
      validation: [Validators.required, Validators.email],
      //errorStateMatcher: new EmailErrorStateMatcher(),
    },
    {
      type: 'password',
      // label: 'Favourite Food',
      name: 'password',
      placeholder: 'Password',
      validation: [Validators.required, Validators.minLength(6)],
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { controls } = this.loginForm;

    this.authService.login(controls.email.value, controls.password.value)
      .subscribe((user) => {
        this.loading = false;

        this.router.navigate(['admin/posts']);
      },
      error => {
        this.loading = false;
        
        this.messageService.error('Email or password is incorrect');
      });
  }

  getErrorByFieldName(fieldName: string)  {
    const { errors, value } = this.loginForm.controls[fieldName];
    const capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    switch (true) {
      case errors.email: {
        return `${value} is not a valid email`;
      }
      case errors.required: {
        return `${capitalizedFieldName} field is required`;
      }
      case !!errors.minlength.requiredLength: {
        return `${capitalizedFieldName} must be at least ${errors.minlength.requiredLength} characters long`;
      }
    }
  }
}


