import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

import {UsersService} from './users.service';
import {GlobalService} from './global.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(
        private staffService: UsersService,
        private globalService: GlobalService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.globalService.isLoggedIn()) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.staffService.redirectURL = url;

        // Navigate to the login page with extras
        this.router.navigate(['/authentication/sign-in'], {queryParams: {r: url}});
        window.onload = function() {
            if(!window.location.hash) {
                window.location.href = window.location + '#sign';
                window.location.reload();
            }
        }
        return false;
    }
}
