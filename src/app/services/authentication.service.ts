import { AdminLocalStorageService } from "./admin-local-storage.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthenticationService {
    constructor(
        private localStorage: AdminLocalStorageService) {
    }

    isAuthenticated(){
        var token = this.localStorage.getToken();
        return token != null;
    }
}