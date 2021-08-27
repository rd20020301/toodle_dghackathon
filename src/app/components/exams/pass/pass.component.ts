import { ViewChild, Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/projects.service';
import { UsersService } from '../../../services/users.service';
import { CountdownComponent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { MathjaxComponent } from '../../../mathjax/mathjax.component';

@Component({
    selector: 'app-exam-pass',
    templateUrl: './pass.component.html'
})
export class PassComponent implements OnInit {
    @ViewChild(MathjaxComponent) childView: MathjaxComponent;
    @ViewChild(CountdownComponent) counter: CountdownComponent;
    email: string;
    isAdmin: boolean;
    exam_id: number;
    constructor(public router: Router, private route: ActivatedRoute, public examService: ProjectService,
        public userService: UsersService, public toast: ToastrService) {
        this.email = "";
        this.isAdmin = true;
    }
    classes: any[] = [];
    questions: any[] = []


    singleSelectConfig: any = {
        labelField: 'class',
        valueField: 'id',
        searchField: ['class']
    };

    public class_id: number;
    public start_time: string;
    public end_time: string;
    public exam: any;
    public result: any;
    public started: boolean = false;
    public finished: boolean = false;

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.exam_id = params['id'];
                this.examService.getExamInfo(params['id'])
                    .subscribe(
                        data => {
                            this.exam = data.data;
                            this.started = this.exam.started;
                            this.finished = this.exam.finished;
                            this.questions = this.exam.questions;
                            this.result = this.exam.result;
                        },
                        error => {
                            console.log(error);
                        });
            }
        });
    }

    onSubmit() {
        let data: any;
        data = {
            exam_id: this.exam_id,
            questions: this.questions,
        };

        this.examService.finishExam(data)
            .subscribe(
                result => {
                    if (result.status) {
                        this.router.navigate(['/dashboard']);
                        let count = result.data.correct;
                        let quantity = result.data.quantity;
                        swal(
                            "Ajoyib!", "To'g'ri jaboblar soni " + quantity + " tadan " + count + " ta", "success"
                        );
                    } else {
                    }
                },
                error => {
                    // Validation errors
                    if (error.status === 422) {
                    } else if (error.status === 401 || error.status === 403) {
                        // Unauthorized Access
                        this.userService.unauthorizedAccess(error);
                    }
                }
            );
    }

    startExam() {
        let data = {
            exam_id: this.exam_id
        };
        this.examService.startExam(data).subscribe(
            data => {
                this.started = true;
                this.questions = data.data;
                if (this.exam.time != 0)
                    this.counter.begin();
            },
            error => {
                // Validation errors
                if (error.status === 422) {
                } else if (error.status === 401 || error.status === 403) {
                    // Unauthorized Access
                    this.userService.unauthorizedAccess(error);
                }
            }
        );
    }

}
