import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Tenant } from '../../../models/tenant';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ProjectService } from '../../../services/projects.service';
import swal from 'sweetalert2'
import { DataTableDirective } from 'angular-datatables';
import { isUndefined } from 'angular';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

declare var $: any;
@Component({
  selector: 'app-teachers-list',
  templateUrl: './pupils.component.html'
})

export class PupilsComponent implements OnInit, AfterViewInit {
  public dtOptions: DataTables.Settings = {};
  public dtResultOptions: DataTables.Settings = {};
  public model: any;
  public credentials: any;
  classes: any[] = [];
  public file_class: number;
  public class_id: number;
  public file_column: string = "A1";
  public fileToUpload: File;

  
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;

  constructor(
    public userService: UsersService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public examService: ProjectService,
    private spinner: NgxSpinnerService
  ) {
  }

  singleSelectConfig: any = {
    labelField: 'class',
    valueField: 'id',
    searchField: ['class']
  };

  rerender(): void {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first 
      //debugger;
      var table = $('#pupilsTable').DataTable();

      table.destroy();

      dtInstance.destroy();
    });

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
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

  selectClass() {
    this.file_class = this.class_id;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  downloadPdf() {
    const doc = new jsPDF() as jsPDFWithPlugin;

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    doc.autoTable({ html: '#markTable' });
    
    doc.save(this.file_class + ".pdf");
  }

  uploadFile() {
    this.spinner.show();
    let data = {
      class: this.file_class,
      file: this.fileToUpload,
      column: this.file_column
    };

    this.userService.postFile(data).subscribe(
      response => {
        this.spinner.hide();
        this.credentials = response.data; 
        $("#upload-file").modal({backdrop: 'static', keyboard: false});          
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

  getPupils() {
    if (this.class_id > 0) {
      this.model = null;
      this.spinner.show();
      this.userService.getPupils(this.class_id).subscribe(data => { this.model = data.data; this.spinner.hide(); });
    }
  }

  newFile(){
    this.file_column = "A1";
    this.file_class = null;
    this.fileToUpload = null;
    this.credentials = null;
  }

  changeClass() {
    this.rerender();
    this.getPupils();
  }

  ngOnInit() {
    this.spinner.show();
    this.getGroups();
    this.spinner.hide();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.class_id = params['id'];
        this.getPupils();
      }
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      autoWidth: true,
      columns: [
        null,
        null,
        null
      ],
      pageLength: 50,
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
