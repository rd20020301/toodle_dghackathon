import { Routes } from '@angular/router';

//Authentication Components
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        data: {
          title: 'sign-in'
        }
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
          title: 'sign-up'
        }
      }
    ]
  }
];

