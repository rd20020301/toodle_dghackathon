import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../models/exam';
import { UsersService } from '../../../services/users.service';
import { ProjectService } from '../../../services/projects.service';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tenant-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
  public exam: Exam;
  currentUser: any;
  public fileToUpload: File;
  constructor(public router: Router, public userService: UsersService, public examService: ProjectService) {
  }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    this.exam = new Exam("", 1, 0, this.fileToUpload);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  createExam() {
    this.exam.file = this.fileToUpload;
    this.examService.save(this.exam).subscribe(
      data => {
        this.router.navigate(['exams/detail', data.data.id, 'create']);
        this.exam.name = "";
        this.exam.quantity = 0;
        this.exam.time = 0;
        this.fileToUpload = null;
        swal(
          "Ajoyib!", "Test muvaffaqiyatli yaratildi!", "success"
        );
      }
    );
  }
}
