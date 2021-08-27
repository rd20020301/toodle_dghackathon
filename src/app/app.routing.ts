import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';
import { AuthGuardService } from '../app/services/auth-guard.service';
export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuardService],
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }
        ]
    },
    {
        path: '',
        component: AuthenticationLayoutComponent,
        children: [
            {
                path: 'authentication',
                loadChildren: './auth/authentication.modules#AuthenticationModule'
            }
        ]
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'exams',
                canActivate: [AuthGuardService],
                loadChildren: './components/exams/exams.module#ExamsModule'
            }
        ]
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'users',
                canActivate: [AuthGuardService],
                loadChildren: './components/users/users.module#UsersModule'
            }
        ]
    }
];

