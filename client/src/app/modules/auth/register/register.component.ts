import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/shared/message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  hide = true;
  mainError: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient,
    ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.comparePasswords]],
    });
  }

  comparePasswords(passwordKey) {
    // console.log(passwordKey);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const { controls } = this.registerForm;

    const userData = {
      email: controls.email.value,
      password: controls.password.value,
      active: true,
      role: 'authenticated',
    };

    this.authService.register(userData)
      .subscribe((user) => {
        this.router.navigate(['admin/posts']);
      },
      error => {
        this.loading = false;
        //this.messageService.error('Email or password is incorrect');
      });
  }

  // @TODO
  signInGoogle() {
    window.location.href = 'http://localhost:3001/api/login/google';
  }

  // @TODO
  signInGithub() {
    window.location.href = 'http://localhost:3001/api/login/github';
  }

  getErrorByFieldName(fieldName: string)  {
    const { errors, value } = this.registerForm.controls[fieldName];
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
