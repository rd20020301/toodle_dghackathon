import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../../services/projects.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert2'
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html'
})
export class JournalComponent implements OnInit, AfterViewInit {
  public dtOptions: DataTables.Settings = {};
  public model: any;
  public class_id: number = 0;
  constructor(
    public router: Router, private route: ActivatedRoute,
    public examService: ProjectService,
    public userService: UsersService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  isTeacher() {
    return this.userService.isTeacher();
  }

  isPupil() {
    return this.userService.isPupil();
  }

  deleteExam(exam: any) {
    var _this = this;
    swal({
      title: 'Tasdiqlaysizmi?',
      text: "Siz rostdan ham testni o'chirmoqchimisiz?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ha, Tasdiqlayman!',
      cancelButtonText: 'Yoq, bekor qilish!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (dismiss) {
      if (dismiss.dismiss) {
        swal(
          'Bekor qilindi!',
          "Testni o'chirishni bekor qildingiz :)",
          'error'
        )
      } else {
        _this.examService.deleteExam(exam.id).subscribe(data => {
          if (data.data.message == "success") {
            window.location.reload();
          } else {
            swal(
              'Xatolik :(',
              "Testni o'chirishda xatolik",
              'error'
            )
          }
        });
      }
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.class_id = params['id'];
        this.spinner.show();
        this.examService.getJournal(this.class_id).subscribe(data => { this.model = data.data; this.spinner.hide(); });
      } else {
        this.spinner.show();
        this.examService.getClasses().subscribe(data => { this.model = data.data; this.spinner.hide(); });
      }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      autoWidth: true,
      columns: [
        { "width": "10%" },
        null,
        null,
        null
      ],
      info: false,
      language: {
        search: "Izlash",
        paginate: {
          "first": "Birinchi",
          "last": "Oxirgi",
          "next": "Keyingisi",
          "previous": "Oldingisi"
        },
        emptyTable: "Testlar mavjud emas",
        loadingRecords: "Yuklanmoqda...",
        processing: "Jarayonda...",
        lengthMenu: "_MENU_ ta ma'lumotni chop etish",
      }
    };
  }

}
