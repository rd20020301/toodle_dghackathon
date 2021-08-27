import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Exam } from '../models/exam';
import { Class } from '../models/class';
import { GlobalService } from './global.service';
import { ResponseBody } from '../models/response-body';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectService {
    constructor(private http: Http, private httpClient: HttpClient, private globalService: GlobalService) { }

    getAll() {
        return this.http.get('/exam').map((response: Response) => response.json());
    }

    getClasses() {
        return this.http.get('/exam/journal').map((response: Response) => response.json());
    }

    getJournal(id: number) {
        return this.http.get('/exam/journal/'+id).map((response: Response) => response.json());
    }

    getExams() {
        return this.http.get('/exam/exams').map((response: Response) => response.json());
    }

    getExam(id: number) {
        return this.http.get('/exam/exams/' + id).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/exam/' + _id).map((response: Response) => response.json());
    }

    deleteExam(_id: string) {
        return this.http.get('/exam/dexam/' + _id).map((response: Response) => response.json());
    }

    deleteAccess(_id: string, exam_id: number) {
        return this.http.get('/exam/daccess/' + _id + '/' + exam_id).map((response: Response) => response.json());
    }

    getExamInfo(_id: string) {
        return this.http.get('/exam/info/' + _id).map((response: Response) => response.json());
    }

    save(exam: Exam) {
        let fileToUpload = exam.file;
        let name = exam.name;
        let quantity = exam.quantity;
        let time = exam.time;

        const formData: FormData = new FormData();
        formData.append('name', name.toString());
        if (fileToUpload)
            formData.append('fileKey', fileToUpload, fileToUpload.name);
        formData.append('quantity', quantity.toString());
        formData.append('time', time.toString());

        return this.http.post('/exam', formData).map((response: Response) => response.json());
    }

    inviteClass(data: any) {
        return this.http.post('/exam/invite', data).map((response: Response) => response.json());
    }

    startExam(data: any) {
        return this.http.post('/exam/start', data).map((response: Response) => response.json());
    }

    getAllClasses(): Observable<Class[]> {
        const headers = GlobalService.getHeaders();

        return this.httpClient
            .get<ResponseBody>(
                this.globalService.apiHost + '/timetable/class',
                {
                    headers: headers
                }
            )
            .map(response => {
                return <Class[]>response.data;
            })
            .catch(GlobalService.handleError);
    }

    getAllSubjects(): Observable<Class[]> {
        const headers = GlobalService.getHeaders();

        return this.httpClient
            .get<ResponseBody>(
                this.globalService.apiHost + '/timetable/subject',
                {
                    headers: headers
                }
            )
            .map(response => {
                return <Class[]>response.data;
            })
            .catch(GlobalService.handleError);
    }

    getMarks(_id: number, exam: number) {
        return this.http.get('/exam/marks/' + _id + '/' + exam).map((response: Response) => response.json());
    }

    updateTimeTable(data: any): Observable<any> {
        const headers = GlobalService.getHeaders();

        return this.httpClient
            .put<ResponseBody>(
                this.globalService.apiHost + '/exam/' + data.id,
                JSON.stringify(data),
                {
                    headers: headers
                }
            )
            .map(response => {
                return response;
            })
            .catch(GlobalService.handleError);
    }

    finishExam(data: any) {
        return this.http.post('/exam/finish', data).map((response: Response) => response.json());
    }

    // delete(_id: string) {
    //     return this.http.delete('/api/tenant/delete/' + _id).map((response: Response) => response.json());
    // }
}