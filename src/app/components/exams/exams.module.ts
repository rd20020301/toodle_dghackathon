import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamsRoutes } from './exams.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Authentication Component
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { InfoComponent } from './info/info.component';
import { JournalComponent } from './journal/journal.component';
import { InviteComponent } from './invite/invite.component';
import { PassComponent } from './pass/pass.component';
import { TenantService } from '../../services/tenants.service';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { ArchwizardModule, WizardState } from 'angular-archwizard';
import { NgSelectizeModule } from 'ng-selectize';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CountdownModule } from 'ngx-countdown';
import { NgxSpinnerModule } from "ngx-spinner";
import { MathJaxModule } from 'ngx-mathjax';
import { MathjaxComponent } from '../../mathjax/mathjax.component';
import { GlobalMathService } from '../../services/globalMath.service';

@NgModule({
  imports: [
    RouterModule.forChild(ExamsRoutes),
    FormsModule,
    CommonModule,
    DataTablesModule,
    NgbModule,
    CustomFormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    UiSwitchModule,
    NgSelectizeModule,
    MathJaxModule.forRoot(),
    CountdownModule,
    NgxSpinnerModule
  ],
  declarations: [
    ListComponent,
    InfoComponent,
    InviteComponent,
    MathjaxComponent,
    JournalComponent,
    CreateComponent,
    PassComponent
  ],
  providers: [
    TenantService,
    WizardState,
    GlobalMathService
  ]
})
export class ExamsModule { }
