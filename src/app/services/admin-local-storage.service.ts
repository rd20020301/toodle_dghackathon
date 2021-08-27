import { Injectable } from "@angular/core";

@Injectable()
export class AdminLocalStorageService  {
    constructor() {
    }

    public getToken(): any{
        return localStorage.getItem('awsToken');
    }

    public deleteToken(): any{
        localStorage.clear();
    }

    public setToken(token): any{
        localStorage.setItem('awsToken', token);
    }

    public setPayload(payload): any{
        localStorage.setItem('payload', payload);
    }

    public getUser(){
        return JSON.parse(localStorage.getItem('payload'));
    }

    public setAccessToken(token): any {
        localStorage.setItem('accessToken', token);
    }
}