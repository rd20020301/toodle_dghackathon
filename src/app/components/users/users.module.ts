import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersRoutes } from './users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Authentication Component
import { PupilsComponent } from './pupils/pupils.component';
import { TeacherComponent } from './teachers/teacher.component';
import { InfoComponent } from './info/info.component';
import { TenantService } from '../../services/tenants.service';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { ArchwizardModule, WizardState } from 'angular-archwizard';
import { NgSelectizeModule } from 'ng-selectize';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CountdownModule } from 'ngx-countdown';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    RouterModule.forChild(UsersRoutes),
    FormsModule,
    CommonModule,
    DataTablesModule,
    NgbModule,
    CustomFormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    UiSwitchModule,
    NgSelectizeModule,
    CountdownModule,
    NgxSpinnerModule
  ],
  declarations: [
    TeacherComponent,
    PupilsComponent,
    InfoComponent
  ],
  providers: [
    TenantService,
    WizardState
  ]
})
export class UsersModule { }
