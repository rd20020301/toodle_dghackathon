import { Component, OnInit } from '@angular/core';
import { AdminLocalStorageService } from '../services/admin-local-storage.service';
import { Router, Route } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ProjectService } from '../services/projects.service';
import { Exam } from '../models/exam';
import swal from 'sweetalert2'
import { RouterConfig } from 'aws-sdk/clients/directconnect';
@Component({
    selector: 'app-dashboard',
    templateUrl: './common-layout.component.html'
})

export class CommonLayoutComponent implements OnInit {
    exam: Exam;
    public app: any;
    public headerThemes: any;
    public changeHeader: any;
    public sidenavThemes: any;
    public changeSidenav: any;
    public headerSelected: any;
    public sidenavSelected: any;
    public searchActived: any;
    public searchModel: any;
    public currentUser: any;
    public canAdd: boolean = true;
    public fileToUpload: File;

    constructor(public projectService: ProjectService, public route: Router, public userService: UsersService, public localservice: AdminLocalStorageService, public router: Router) {                
        //this.currentUser.username = this.currentUser.username;
        this.app = {
            layout: {
                sidePanelOpen: false,
                isMenuOpened: true,
                isMenuCollapsed: false,
                themeConfigOpen: false,
                rtlActived: false,
                searchActived: false,                
            }
        };

        this.headerThemes = ['header-default', 'header-primary', 'header-info', 'header-success', 'header-danger', 'header-dark'];
        this.changeHeader = changeHeader;

        function changeHeader(headerTheme) {
            this.headerSelected = headerTheme;
        }

        this.sidenavThemes = ['sidenav-default', 'side-nav-dark'];
        this.changeSidenav = changeSidenav;

        function changeSidenav(sidenavTheme) {
            this.sidenavSelected = sidenavTheme;
        }
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
      }

    isAdmin() {
        return this.userService.isAdmin();
    }

    isSuperUser(){
        return this.userService.isSuperUser(); 
    }

    isTeacher() {
        return this.userService.isTeacher();
    }

    isPupil() {
        return this.userService.isPupil();
    }

    ngOnInit() {
        this.currentUser = this.userService.getUser();
        this.exam = new Exam('', 1, 0, this.fileToUpload);
        if(this.route.url != '/dashboard') this.canAdd = false;
    }

    createExam() {      
        this.exam.file = this.fileToUpload; 
        this.projectService.save(this.exam).subscribe(
            response => {
                this.router.navigate(['exams/detail', response.data.id, 'create']);
                this.exam.name = "";
                this.exam.quantity = 0;
                this.exam.time = 0;
                this.fileToUpload = null;
                swal(
                    "Ajoyib!", "Test muvaffaqiyatli yaratildi!", "success"
                );
            },
            err => {
                // Do stuff whith your error
            },
            () => {
                // Do stuff after completion
            },
        );
    }

    logout() {
        this.localservice.deleteToken();
        this.router.navigate(['authentication/sign-in']);
    }
}
