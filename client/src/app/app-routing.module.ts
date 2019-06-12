import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' }
];

export const routing = RouterModule.forRoot(routes);
