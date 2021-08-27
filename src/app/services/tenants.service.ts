import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Tenant } from '../models/tenant';
 
@Injectable()
export class TenantService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.post('/exam', null).map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get('/exam/'+_id).map((response: Response) => response.json());
    }

 
    save(tenant: Tenant) {
        return this.http.post('/exam', tenant).map((response: Response) => response.json());
    }
 
    // delete(_id: string) {
    //     return this.http.delete('/api/tenant/delete/' + _id).map((response: Response) => response.json());
    // }
}