import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/projects.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-tanant-invite',
  templateUrl: './invite.component.html'
})
export class InviteComponent implements OnInit {
  email: string;
  isAdmin: boolean;
  exam_id: number;
  constructor(public router: Router, private route: ActivatedRoute, public examService: ProjectService,
    public userService: UsersService,) {
    this.email = "";
    this.isAdmin = true;
  }
  classes: any[] = [];


  singleSelectConfig: any = {
    labelField: 'class',
    valueField: 'id',
    searchField: ['class']
  };

  public class_id: number;
  public start_time: string;
  public end_time: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.exam_id = params['id'];
        this.getGroups();
      }
    });
  }

  public getGroups() {
    this.examService.getAllClasses()
      .subscribe(
        settings => {
          //this.pupils = settings;
          settings.forEach(element => {
            this.classes.push(element);
          });
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

  inviteUser() {
    let data = {
      exam_id: this.exam_id,
      class_id: this.class_id,
      start_time: this.start_time,
      end_time: this.end_time
    };
    console.log(data);
    this.examService.inviteClass(data).subscribe(
      data => {
        if (data.data.status) {
          this.router.navigate(['/exams/detail', this.exam_id]);
          swal(
            "Ajoyib!", "Sinf biriktirildi!", "success"
          );
        }
        else swal(
          "Xatolik!", data.data.message, "error"
        );
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
