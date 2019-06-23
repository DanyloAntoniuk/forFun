import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/shared/message.service';
import { HttpClient } from '@angular/common/http';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  config: FieldConfig[];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.config = [
      {
        type: 'email',
        label: 'Email',
        name: 'email',
        placeholder: 'Enter your email',
        validation: [Validators.required, Validators.email],
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        validation: [Validators.required, Validators.minLength(6)],
      },
      {
        type: 'confirmPassword',
        name: 'confirm-password',
        placeholder: 'Confirm password',
        validation: [Validators.required],
      },
      {
        label: 'Register',
        name: 'submit',
        type: 'button',
        disabled: false,
      },
    ];
  }

  submit(values: {[key: string]: string}) {
    this.config[this.config.length - 1].disabled = true;
    const userData = {
      email: values.email,
      password: values.password,
      active: true,
      role: 'authenticated',
    };

    this.authService.register(userData)
      .subscribe(() => {
        this.config[this.config.length - 1].disabled = false;

        this.router.navigate(['admin/posts']);
      },
      () => {
        this.config[this.config.length - 1].disabled = false;
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
}
