import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { NotFoundComponent } from './core/errorHandlers/not-found/not-found.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { TestComponent } from './core/test/test.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', canLoad: [AuthGuard], loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: 'test', component: TestComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

export const routing = RouterModule.forRoot(routes);
