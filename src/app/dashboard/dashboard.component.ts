import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeConstants } from '../shared/config/theme-constant';
import { UsersService } from '../services/users.service';
import { ProjectService } from '../services/projects.service';
import { Router, Route } from '@angular/router';
import swal from 'sweetalert2'

@Component({
    templateUrl: 'dashboard.html'
})

export class DashboardComponent implements OnInit {    
    public currentUser: any;
    data: any = [];
    subjects: any[] = [];
    public teachers: any;
    public subject_id: number;
    public dtOptions: DataTables.Settings = {};
    
    constructor(public route: Router, public userService: UsersService, public examService: ProjectService) {
    }

    singleSelectConfig: any = {
        labelField: 'name',
        valueField: 'id',
        searchField: ['name']
    };

    isAdmin() {
        return this.userService.isAdmin();
    }

    public getSubjects() {        
        this.examService.getAllSubjects()
            .subscribe(
                settings => {
                    //this.pupils = settings;
                    this.subjects = settings;
                },
                error => {
                    // unauthorized access
                    if (error.status === 401 || error.status === 403) {
                        this.userService.unauthorizedAccess(error);
                    } else {

                    }
                }
            );
    }

    getExams() {
        if (this.subject_id > 0) {
            this.data = null;
            this.examService.getExam(this.subject_id).subscribe(data => { this.data = data.data; });
        }
    }

    isTeacher() {
        return this.userService.isTeacher();
    }

    isPupil() {
        return this.userService.isPupil();
    }

    ngOnInit() {
        this.currentUser = this.userService.getUser();        
        if (this.userService.isPupil()) { 
            this.getSubjects(); 
            this.examService.getExams().subscribe(data => this.data = data.data);
        }
        else if (this.userService.isAdmin()) {
            this.userService.getTeachers(this.currentUser.school_id)
                .subscribe(
                    settings => {
                        //this.pupils = settings;
                        this.teachers = settings.data;
                    },
                    error => {
                        // unauthorized access
                        if (error.status === 401 || error.status === 403) {
                            this.userService.unauthorizedAccess(error);
                        } else {

                        }
                    }
                );
        }        
        this.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: true,
            columns: [
              { "width": "40%" },              
              { "width": "30%" },
              { "width": "30%" },
            ],
            pageLength: 10,
            info: false,
            language: {
              search: "Izlash",
              paginate: {
                "first": "Birinchi",
                "last": "Oxirgi",
                "next": "Keyingisi",
                "previous": "Oldingisi"
              },
              emptyTable: "Ma'lumot mavjud emas",
              loadingRecords: "Yuklanmoqda...",
              processing: "Jarayonda...",
              lengthMenu: "_MENU_ ta ma'lumotni chop etish",
            }
          };        
    }

    startExam(exam: any) {
        swal(
            ":(", "Boshlanish vaqti hali kelmagan!", "warning"
        );
    }
}
