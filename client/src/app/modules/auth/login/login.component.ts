import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/shared/message.service';
import { FieldConfig } from 'src/app/core/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  config: FieldConfig[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
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
        label: 'Login',
        name: 'submit',
        type: 'button',
        disabled: this.loading,
      },
    ];
  }

  submit(values: {[key: string]: string}) {
    this.config[this.config.length - 1].disabled = true;

    this.authService.login(values.email, values.password)
      .subscribe(() => {
        this.config[this.config.length - 1].disabled = false;

        this.router.navigate(['admin/posts']);
      },
      () => {
        this.config[this.config.length - 1].disabled = false;

        this.messageService.error('Email or password is incorrect');
      });
  }
}


