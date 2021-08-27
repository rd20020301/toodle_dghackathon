import { ViewChild, HostListener, Component, OnInit, ViewEncapsulation, ChangeDetectorRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../../../services/projects.service';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent, NavigationMode } from 'angular-archwizard';
import swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MathjaxComponent } from '../../../mathjax/mathjax.component';
import { UserOptions } from 'jspdf-autotable';
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}
declare var $: any;
@Component({
  selector: 'app-exam-detail',
  templateUrl: './info.component.html'
})

export class InfoComponent implements OnInit, AfterViewInit {
  @ViewChild(MathjaxComponent) childView: MathjaxComponent;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'F9') {
      this.viewDemo(this.currentStep);
      $("#modal-view").modal('show');
    }
  }

  @ViewChild('wizard')
  public wizard: WizardComponent;

  public navigate: NavigationMode;

  public dtOptions: DataTables.Settings = {};
  public dtResultOptions: DataTables.Settings = {};
  model: any;
  public results: any;
  public isCompleted: any;
  public onStep2Next: any;
  public onStep3Next: any;
  public onComplete: any;
  public currentStep: number = 1;
  public selectedClass: any;
  public questions: any[] = [];
  public classes: any[] = [];
  public isOpen: boolean;
  public selectedQuestion: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public examService: ProjectService,
    public userService: UsersService,
    private cdr: ChangeDetectorRef,
    public toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.isOpen = false;
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
        emptyTable: "Hali hech qanday sinf bog'lanmagan",
        loadingRecords: "Yuklanmoqda...",
        processing: "Jarayonda...",
        lengthMenu: "_MENU_ ta ma'lumotni chop etish",
      }
    };
    this.dtResultOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      autoWidth: true,
      columns: [
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
        emptyTable: "Ma'lumot mavjud emas!",
        loadingRecords: "Yuklanmoqda...",
        processing: "Jarayonda...",
        lengthMenu: "_MENU_ ta ma'lumotni chop etish",
      }
    };
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onRadioChanged(index, i): void {
    var count = 0;
    this.questions[index].answers.forEach(element => {
      if (count == i - 1) {
        this.questions[index].answers[count].correct = true;
      } else this.questions[index].answers[count].correct = false;
      count++;
    });
  }

  viewDemo(index): void {
    this.selectedQuestion = this.questions[index - 1];
  }

  downloadPdf() {
    const doc = new jsPDF() as jsPDFWithPlugin;

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    (function (jsPDFAPI) {
      var font = 'AAEAAAAQAQAABAAAR......';
      var callAddFont = function () {
        this.addFileToVFS('PTSans.tff', font);
        this.addFont('PTSans.tff', 'PTSans', 'normal');
      };
      jsPDFAPI.events.push(['addFonts', callAddFont])
    })(jsPDF.API);


    console.log(doc.getFontList());

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);

    doc.autoTable({ html: '#markTable', headStyles: {font: "helvetica", fontStyle: 'normal'} });

    doc.save(this.selectedClass.name + ".pdf");
  }

  deleteAccess(clas: any) {
    var _this = this;
    swal({
      title: 'Tasdiqlaysizmi?',
      text: "Siz rostdan ham bu sinfga test yechish ruxsatini o'chirmoqchimisiz?",
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
          "Siz bu sinfni qolgan sinflar kabi testni yechishga ruxsat berdingiz. :)",
          'error'
        )
      } else {
        _this.examService.deleteAccess(clas.class_id.id, _this.model.id).subscribe(data => {
          if (data.data.message == "success") {
            window.location.reload();
          } else {
            swal(
              'Xatolik :(',
              "O'chirishda xatolik",
              'error'
            )
          }
        });
      }
    })
  }

  getMarks(classname: any, exam: any) {
    this.spinner.show();
    this.results = null;
    this.selectedClass = exam;
    let id = classname.id;
    this.examService.getMarks(id, exam.id)
      .subscribe(
        result => {
          this.spinner.hide();
          if (result.status) {
            this.results = result.data;
          } else {
          }
        },
        error => {
          this.spinner.hide();
          // Validation errors
          if (error.status === 422) {
          } else if (error.status === 401 || error.status === 403) {
            // Unauthorized Access
            this.userService.unauthorizedAccess(error);
          }
        }
      );
  }

  onSubmit() {
    let data: any;
    data = {
      name: this.model.name,
      id: this.model.id,
      questions: this.questions,
      time: this.model.time
    };

    this.examService.updateTimeTable(data)
      .subscribe(
        result => {
          if (result.status) {
            this.router.navigate(['/exams/detail', this.model.id]);
            this.toast.success("Ma'lumotlar saqlandi!", "Ajoyib");
            this.ngOnInit();
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

  changeStep(action: number) {
    if (action === 1) this.currentStep++;
    else this.currentStep--;
  }

  goToStep() {
    if (this.currentStep > this.model.quantity) this.currentStep = this.model.quantity;
    if (this.wizard && this.currentStep) {
      this.wizard.navigation.goToStep(this.currentStep - 1);
    }
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      if (params['mode'] && params['mode'] == 'create') this.isOpen = true;
      if (params['id']) {
        this.examService.getById(params['id'])
          .subscribe(
            data => {
              this.spinner.hide();
              if (data != null && params['id'] == data.data.id) {
                this.model = data.data;
                this.questions = null;
                this.classes = null;
                var questions = JSON.parse(data.data.questions);
                this.questions = questions;
                this.classes = this.model.access;
              } else {
                this.router.navigate(['/exams/list']);
              }
            },
            error => {
              this.spinner.hide();
              console.log(error);
            });
      } else {
        this.router.navigate(['/exams/list']);
      }
    });

  }

}
