import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Teacher, Info, Subject } from '../../../models/teacher';
import { Student, InfoUser, ClassName } from '../../../models/pupil';
import { UsersService } from '../../../services/users.service';
import { ProjectService } from '../../../services/projects.service';
import swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-info-user',
    templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
    public teacher: Teacher;
    public pupil: Student;
    public mode: string;
    public modeUser: string;
    public school_id: number;
    currentUser: any;
    public model: any;
    public subjects: any = [];
    public classes: any = [];
    constructor(
        public router: Router,
        public location: Location,
        public userService: UsersService,
        public examService: ProjectService,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService
    ) {
    }

    singleSelectConfig: any = {
        labelField: 'name',
        valueField: 'id',
        searchField: ['name']
    };

    classSelectConfig: any = {
        labelField: 'class',
        valueField: 'id',
        searchField: ['class']
    };

    public getGroups() {
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

    public getClasses() {
        this.examService.getAllClasses()
            .subscribe(
                settings => {
                    //this.pupils = settings;
                    this.classes = settings;
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

    ngOnInit() {
        this.subjects = null;
        this.classes = null;
        this.currentUser = this.userService.getUser();
        this.spinner.show();
        this.route.params.subscribe(params => {
            this.modeUser = params['mode'];
            if (this.modeUser == 'teacher') {
                this.getGroups();
                if(params['school']){
                    this.school_id = params['school'];
                }else{
                    this.router.navigate(['users/list']);
                }                
            }
                else this.getClasses();
            console.log(this.modeUser);
            if (params['id'] && params['id'] != 0) {                                            
                this.mode = "update";
                if (this.modeUser == 'teacher') {
                    this.userService.getMe(params['id'])
                        .subscribe(
                            data => {
                                this.spinner.hide();
                                if (data != null && params['id'] == data.data.id) {

                                    this.teacher = data.data;
                                } else {
                                    this.router.navigate(['/users/list']);
                                }
                            },
                            error => {
                                this.spinner.hide();
                                console.log(error);
                            });
                } else {
                    this.userService.getPupil(params['id'])
                    .subscribe(
                        data => {
                            this.spinner.hide();
                            if (data != null && params['id'] == data.data.id) {
                                this.pupil = data.data;
                            } else {
                                this.router.navigate(['/users/pupils']);
                            }
                        },
                        error => {
                            this.spinner.hide();
                            console.log(error);
                        });
                }
            } else {
                this.spinner.hide();
                this.mode = "create";
                if (this.modeUser == 'teacher') {
                    let info = new Info();
                    let subject = new Subject();
                    this.teacher = new Teacher(0, info, this.school_id,"", subject, "");
                } else {
                    let info = new InfoUser();
                    let className = new ClassName();
                    this.pupil = new Student(0, info, "", className, "");
                }
            }
        });
    }

    updateTeacher() {
        this.userService.updateTeacher(this.teacher).subscribe(
            data => {
                this.router.navigate(['users/detail', this.modeUser, data.data.id]);
                swal(
                    "Ajoyib!", "Ma'lumotlar yangilandi!", "success"
                );
            }
        );
    }

    updatePupil() {
        this.userService.updatePupil(this.pupil).subscribe(
            data => {
                this.router.navigate(['users/detail', this.modeUser, data.data.id]);
                swal(
                    "Ajoyib!", "Ma'lumotlar yangilandi!", "success"
                );
            }
        );
    }

    createTeacher() {
        this.userService.createTeacher(this.teacher).subscribe(
            data => {
                this.router.navigate(['users/detail', this.modeUser, data.data.id]);
                swal(
                    "Ajoyib!", "Ma'lumotlar yangilandi!", "success"
                );
            }
        );
    }

    createPupil() {
        this.userService.createPupil(this.pupil).subscribe(
            data => {
                this.router.navigate(['users/detail', this.modeUser, data.data.id]);
                swal(
                    "Ajoyib!", "Ma'lumotlar yangilandi!", "success"
                );
            }
        );
    }
}
