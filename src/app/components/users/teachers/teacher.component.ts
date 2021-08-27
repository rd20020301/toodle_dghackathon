import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Tenant } from '../../../models/tenant';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { isUndefined } from 'angular';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

declare var $: any;
@Component({
  selector: 'app-teachers-list',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit, AfterViewInit {
  public dtOptions: DataTables.Settings = {};
  public dtResultOptions: DataTables.Settings = {};
  public model: any;
  schools: any[] = [];
  public file_school: number;
  public school_id: number;
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  public file_column: string = "A1";
  public fileToUpload: File;
  public credentials: any;

  constructor(
    public userService: UsersService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.school_id = 1;
  }

  singleSelectConfig: any = {
    labelField: 'number',
    valueField: 'id',
    searchField: ['number']
  };

  rerender(): void {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first 
      //debugger;
      var table = $('#teachersTable').DataTable();

      table.destroy();

      dtInstance.destroy();
    });

  }

  selectClass() {
    this.file_school = this.school_id;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  downloadPdf() {
    const doc = new jsPDF() as jsPDFWithPlugin;

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    doc.autoTable({ html: '#markTable' });

    doc.save(this.file_school + ".pdf");
  }

  uploadFile() {
    this.spinner.show();
    let data = {
      school_id: this.school_id,
      file: this.fileToUpload,
      column: this.file_column
    };

    this.userService.postTeacher(data).subscribe(
      response => {
        this.spinner.hide();
        this.credentials = response.data;
        $("#upload-file").modal({ backdrop: 'static', keyboard: false });
        $("#upload-file").modal('show');
      },
      err => {
        this.spinner.hide();
        // Do stuff whith your error
      },
      () => {
        this.spinner.hide();
        // Do stuff after completion
      },
    );
  }

  getTeachers() {
    if (this.school_id > 0) {
      this.model = null;
      this.spinner.show();
      this.userService.getTeachers(this.school_id).subscribe(data => { this.model = data.data; this.spinner.hide(); });
    }
  }

  newFile() {
    this.file_column = "A1";
    this.file_school = null;
    this.fileToUpload = null;
    this.credentials = null;
  }

  changeClass() {
    this.rerender();
    this.getSchools();
  }

  public getSchools() {
    this.userService.getSchools()
      .subscribe(
        settings => {
          //this.pupils = settings;
          settings.data.forEach(element => {
            this.schools.push(element);
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

  ngOnInit() {
    this.spinner.show();
    this.getSchools();
    this.spinner.hide();    
    this.getTeachers();
    this.dtOptions = {
      pagingType: 'full_numbers',
      autoWidth: true,
      columns: [
        { "width": "40%" },
        { "width": "30%" },
        { "width": "20%" },
        { "width": "10%" },
      ],
      pageLength: 25,
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
    this.dtResultOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,        
      autoWidth: true,
      columns: [
        null,
        null,
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
        lengthMenu: "_MENU_",
      }
    };
  }

}
