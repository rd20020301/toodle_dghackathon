import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from.js';
import { environment } from '../../environments/environment';
import { CognitoUtils, CognitoCallback } from '../stores/cognito-utils';
import { User } from '../models/user';
import { debug } from 'util';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalService } from './global.service';
import { ResponseBody } from './../models/response-body';

@Injectable()
export class UsersService implements OnInit {
    redirectURL = '';
    loggedIn = false;
    userData: any;

    constructor(
        private globalService: GlobalService,
        private router: Router,
        private jwtHelper: JwtHelperService,
        private http: Http, private httpClient: HttpClient,
    ) {
        if (this.getJWTValue() != null)
            this.userData = this.getJWTValue().data;
    }

    public login(username, password) {
        const headers = GlobalService.getHeaders();

        return this.httpClient
            .post<ResponseBody>(
                this.globalService.apiHost + '/staff/login',
                JSON.stringify({
                    LoginForm: {
                        username: username,
                        password: password
                    }
                }),
                {
                    headers: headers
                }
            )
            .map(response => {
                if (response.success) {
                    localStorage.setItem(
                        environment.tokenName,
                        response.data['access_token']
                    );
                    this.loggedIn = true;
                    if (this.getJWTValue() != null)
                        this.userData = this.getJWTValue().data;
                } else {
                    localStorage.removeItem(environment.tokenName);
                    this.loggedIn = false;
                }
                return response;
            })
            .catch(GlobalService.handleError);
    }

    ngOnInit() {
        this.loggedIn = this.globalService.isLoggedIn();
        if (this.getJWTValue() != null)
            this.userData = this.getJWTValue().data;
    }

    getUser() {
        return this.userData;
    }

    getTeachers(id: number) {
        return this.http.get('/staff/teachers/'+id).map((response: Response) => response.json());
    }

    getPupils(id: number) {
        return this.http.get('/staff/pupils/'+id).map((response: Response) => response.json());
    }    

    getSchools(){
        return this.http.get('/staff/schools').map((response: Response) => response.json());
    }

    getRole() {
        return this.userData.roleLabel;
    }

    isAdmin() {
        return (this.userData.roleLabel == "Administrator") ? true : false;
    }

    isSuperUser(){
        return (this.userData.username == "admin") ? true : false;
    }

    isTeacher() {
        return (this.userData.roleLabel == "Teacher") ? true : false;
    }

    getMe(_id: number) {
        return this.http.get('/staff/info/' + _id).map((response: Response) => response.json());
    }
    
    getPupil(_id: number) {
        return this.http.get('/staff/infop/' + _id).map((response: Response) => response.json());
    }

    isPupil() {
        return (this.userData.roleLabel == "Pupil") ? true : false;
    }

    postFile(data: any): Observable<any> {
        let fileToUpload = data.file;
        let class_id = data.class;
        let column =  data.column;
        console.log(data);
        const formData: FormData = new FormData();
        formData.append('class_id', class_id);
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        formData.append('column', column);

        return this.http
            .post('/staff/upload', formData)
            .map((response: Response) => response.json())
    }

    postTeacher(data: any): Observable<any> {
        let fileToUpload = data.file;
        let school_id = data.school_id;
        let column =  data.column;
        console.log(data);
        const formData: FormData = new FormData();
        formData.append('school_id', school_id);
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        formData.append('column', column);

        return this.http
            .post('/staff/excel', formData)
            .map((response: Response) => response.json())
    }

    updateTeacher(data: any) {
        return this.http.post('/staff/updatet', data).map((response: Response) => response.json());
    }

    updatePupil(data: any) {
        return this.http.post('/staff/updatep', data).map((response: Response) => response.json());
    }

    createTeacher(data: any) {
        return this.http.post('/staff/createt', data).map((response: Response) => response.json());
    }

    createPupil(data: any) {
        return this.http.post('/staff/createp', data).map((response: Response) => response.json());
    }

    unauthorizedAccess(error: any): void {
        this.logout();
        this.router.navigate(['/authentication/sign-in'], { queryParams: { error: error.data.message } });
        window.onload = function () {
            if (!window.location.hash) {
                window.location.href = window.location + '#sign';
                window.location.reload();
            }
        }
    }

    logout(): void {
        localStorage.removeItem(environment.tokenName);
        this.loggedIn = false;
    }

    getJWTValue(): any {
        if (this.globalService.isLoggedIn()) {
            const token = GlobalService.getToken();
            var decodedToken = this.jwtHelper.decodeToken(token);
            //console.log(decodedToken);
            return decodedToken;
        } else {
            return null;
        }
    }

}