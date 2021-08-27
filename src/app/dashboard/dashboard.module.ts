import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConstants } from '../shared/config/theme-constant';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DashboardRoutes } from './dashboard-routing.module';
import { NgSelectizeModule } from 'ng-selectize';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { GlobalMathService } from '../services/globalMath.service';
// Dashboard Component
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild(DashboardRoutes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectizeModule,
        PerfectScrollbarModule,
        DataTablesModule,        
    ],
    declarations: [
        DashboardComponent,        
    ],
    providers: [
        ThemeConstants,
        GlobalMathService
    ]
})
export class DashboardModule { }
