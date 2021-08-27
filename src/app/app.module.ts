import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpHandler } from '@angular/common/http';
import { XHRBackend, HttpModule } from '@angular/http';
//Layout Modules
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';

//Directives
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Sidebar_Directives } from './shared/directives/side-nav.directive';
import { Cards_Directives } from './shared/directives/cards.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TokenInterceptor } from '../app/guards/token-interceptor';

// Routing Module
import { AppRoutes } from './app.routing';

// App Component
import { AppComponent } from './app.component';
import { AdminLocalStorageService } from '../app/services/admin-local-storage.service';
import { AuthGuardService } from '../app/services/auth-guard.service';
import { AuthenticationService } from '../app/services/authentication.service';
import { UsersService } from './services/users.service';
import { GlobalService } from './services/global.service';
import { TenantService } from '../app/services/tenants.service';
import { ProjectService } from '../app/services/projects.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { customHttpProvider } from '../app/helpers/custom-Http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from './../environments/environment';

export function tokenGetter() {
    return localStorage.getItem(environment.tokenName);
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { useHash: true }),
        NgbModule.forRoot(),
        FormsModule,
        HttpClientModule,
        HttpModule,
        PerfectScrollbarModule,        
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter
            }
        })

    ],
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        AuthenticationLayoutComponent,
        Sidebar_Directives,
        Cards_Directives
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        customHttpProvider,
        AdminLocalStorageService,
        AuthGuardService,
        TenantService,
        AuthenticationService,
        ProjectService,
        UsersService,
        GlobalService,

    ],
    bootstrap: [AppComponent]
})


export class AppModule { }
