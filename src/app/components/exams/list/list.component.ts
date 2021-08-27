import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ProjectService } from '../../../services/projects.service';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert2'

@Component({
  selector: 'app-exams-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, AfterViewInit {
  public dtOptions: DataTables.Settings = {};
  public model: any;
  constructor(
    public examService: ProjectService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
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
          if(data.data.message == "success"){
            window.location.reload();
          }else{            
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
    this.spinner.show();
    this.examService.getAll().subscribe(data => { this.model = data.data; this.spinner.hide(); });
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
