import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf'
import { MatDialog, MatSidenav } from '@angular/material';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DrawNameDialogComponent } from './draw-name-dialog/draw-name-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PDFService } from 'src/app/services/pdf.service';
import { PDFDocument } from 'pdf-lib';
import { debug } from 'console';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  id: string;
  drawId: string;
  drawIdCapital: string;
  draw = []
  drawInvoices = [];
  drawChangeOrders = [];
  drawData = [];
  draws = [];
  project = [];
  name: string;
  imgUrls = []
  isChecked = false;
  fileName;
  records = [];
  showUpload = false;


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;


  displayedColumns: string[] = ['company', 'category', 'address', 'invoiceNum', 'amount', 'taxId', 'invoicePath', 'isPaid', '_id'];
  dataSource = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog, public projectService: ProjectService, private observer: BreakpointObserver, private authService: AuthService, private router: Router, private pdfService: PDFService) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.imgUrls = [];
      this.drawData = [];
      this.id = routeParams.id;
      this.drawId = routeParams.drawid;
      this.authService.addInvoiceRouterSubject.next(['/project/invoices', this.id, this.drawId])

      this.projectService.getProjectsForUser(this.authService.getUserID()).subscribe((projects: any[]) => {
        this.projectService.projects = projects;
      });
      this.projectService.getOneProject(this.id).subscribe((project: any[]) => {
        this.project = project;
        this.drawIdCapital = this.makePretty(this.drawId);
        this.drawInvoices = this.getInvoicesOnDraw();
        console.log(this.drawInvoices)
        if (this.drawInvoices.length > 0) {
          this.drawData.push({ name: 'Invoices', data: this.drawInvoices });
        }
        this.drawChangeOrders = this.getChangeOrdersOnDraw();
        if (this.drawChangeOrders.length > 0) {
          this.drawData.push({ name: 'Change Orders', data: this.drawChangeOrders });
        }
        this.draw = this.getDraw();
        this.draws = this.getDrawInfo();
      });
    });
    this.showUpload = false;
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 900px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

  getInvoicesOnDraw() {
    const project = this.project[0]
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0].invoices;
  }

  getChangeOrdersOnDraw() {
    const project = this.project[0]
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0].changeOrders;
  }

  calculateTotal(name) {
    if (name === 'Invoices') {
      return this.drawInvoices.reduce((accum, curr) => accum + curr.invoiceAmt, 0);
    }
    if (name === 'Change Orders') {
      return this.drawChangeOrders.reduce((accum, curr) => accum + curr.invoiceAmt, 0);
    }
  }


  getDraw() {
    const project = this.project[0]
    const draw = project.draws.filter(obj => {
      return obj.name === this.drawId;
    });
    return draw[0];
  }

  getDrawInfo() {
    return this.project[0].draws;
  }

  makePretty(str) {
    var newStr = str.replace(/(.{4})/g, '$1 ');
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }

  downloadBoth() {
    this.downloadInvoicesCSV();
    this.generateInvoicesPDF();
  }

  generateInvoicesPDF() {
    const filesPromiseArr = [];
    const dataSource = this.isChecked ? this.drawChangeOrders : this.drawInvoices;

    console.log(JSON.stringify(dataSource))

    dataSource.forEach(invoice => {
      if (invoice.invoicePath == '') {
        return;
      }
      const splitPath = invoice.invoicePath.split('/');
      const fileName = splitPath[splitPath.length - 1];
      const nameSplit = fileName.split('.');
      const fileType = nameSplit[nameSplit.length - 1];
      filesPromiseArr.push(this.downloadFileFromAWS(fileName, fileType));
    })

    Promise.all(filesPromiseArr).then(values => {
      const pdfBufferArray = [];

      values.forEach(async (fileData: any, index: number) => {
        if (fileData.type === 'pdf') {
          pdfBufferArray.push(fileData.arrayBuffer);
        } else {
          const pdf = new jsPDF('p', 'mm', 'letter');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeightForImage = (fileData.height * pdfWidth) / fileData.width;
          pdf.addImage(fileData.imageData, 0, 0, pdfWidth, pdfHeightForImage);
          const arrayBufferOutput = pdf.output('arraybuffer');
          pdfBufferArray.push(arrayBufferOutput);
        }

        if (index == values.length - 1) {
          const mergedPdf = await this.pdfService.mergePdfs(pdfBufferArray);
          const pdfUrl = URL.createObjectURL(
            new Blob([mergedPdf], { type: 'application/pdf' }),
          );
          window.open(pdfUrl);
          // URL.revokeObjectURL(pdfUrl);
        }
      });
    })
  }

  downloadInvoicesCSV() {
    let items;
    let title;
    let totalType;
    this.draw;
    if (this.isChecked) {
      items = JSON.parse(JSON.stringify(this.drawChangeOrders))
      title = this.project[0].name + ' ChangeOrders.csv'
      totalType = 'Change Orders'
    } else {
      items = JSON.parse(JSON.stringify(this.drawInvoices))
      title = this.project[0].name + '-' + this.draw['name'] + ' Invoices.csv'
      totalType = 'Invoices'
    }
    for (let item of items) {
      delete item['invoicePath']
      delete item['_id']
      delete item['isPaid']
    }
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const mappingHeader = Object.keys(items[0])
    const prettyHeader = Object.keys(items[0])
    for (let i = 0; i < prettyHeader.length; i++) {
      switch (prettyHeader[i]) {
        case 'company':
          prettyHeader[i] = 'Company'
          break;
        case 'address':
          prettyHeader[i] = 'Address'
          break;
        case 'taxId':
          prettyHeader[i] = 'Tax ID'
          break;
        case 'category':
          prettyHeader[i] = 'Category'
          break;
        case 'invoiceNum':
          prettyHeader[i] = 'Invoice Number'
          break;
        case 'invoiceAmt':
          prettyHeader[i] = 'Invoice Amount'
          break;
        case 'costCode':
          prettyHeader[i] = 'Cost Code'
          break;
        default:
          console.log("huh?")
      }
    }
    const csv = [
      prettyHeader.join(','), // header row first
      ...items.map(row => mappingHeader.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')),
      `,,,,Total,${this.calculateTotal(totalType)},`
    ].join('\r\n')
    var hiddenElement = document.createElement('a');
    let preChangedData = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.href = preChangedData.split('#').join('%23');
    hiddenElement.target = '_blank';
    hiddenElement.download = title;
    hiddenElement.click();
  }

  downloadFileFromAWS(fileName, fileType) {
    const contentType = fileType === 'pdf' ? 'application/pdf' : 'application/json';
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + '/invoice/get-aws-file/' + fileName, {
        responseType: 'blob',
        headers: new HttpHeaders().append('content-type', contentType)
      }).subscribe((response: any) => {
        if (fileType === 'pdf') {
          const blob = new Blob([(response)], { type: "application/pdf" });
          new Response(blob).arrayBuffer().then((val => {
            resolve({ type: 'pdf', arrayBuffer: val });
          }));
        } else {
          resolve(this.pdfService.blobToImageObject(response));
        }
      });
    })
  }

  openInvoiceFile(invoicePath: string) {
    const splitPath = invoicePath.split('/');
    const fileName = splitPath[splitPath.length - 1];
    const nameSplit = fileName.split('.');
    const fileType = nameSplit[nameSplit.length - 1];

    this.downloadFileFromAWS(fileName, fileType).then((file: any) => {
      if (file.type === 'pdf') {
        PDFDocument.load(file.arrayBuffer).then(async pdf => {
          const pdfOutput = await pdf.save();

          const pdfUrl = URL.createObjectURL(
            new Blob([pdfOutput], { type: 'application/pdf' }),
          );
          window.open(pdfUrl);
          // URL.revokeObjectURL(pdfUrl);
        });
      } else {
        const image = file.image;
        const win = window.open("");
        win.document.write(image.outerHTML);
      }
    })
  }

  createDraw() {
    this.projectService.openNewDraw(this.id, this.drawId).subscribe((res: any) => {
      window.location.reload();
    });
  }

  openDialog(): void {
    let drawName: string;

    const dialogRef = this.dialog.open(DrawNameDialogComponent, {
      width: '255px',
      data: { drawName: drawName },
    });

    dialogRef.afterClosed().subscribe(result => {
      const isAlphaNumeric = /^[a-z0-9]+$/gi.test(result)
      if (result) {
        this.projectService.openNewDraw(this.id, result).subscribe((res: any) => {
          this.router.navigate(['/projects', this.id, 'draws', result]);
        });
      } else {
        alert("Please only use AlphaNumeric Characters (Letters, Numbers, and Spaces")
      }
    });
  };

  changePaidStatus(isPaid, invoiceId, type) {
    this.projectService.changePaidStatus(this.id, this.drawId, invoiceId, isPaid, type).subscribe((res: any) => {
      window.location.reload();
    });
  }

  attachInvoice() {
    window.alert('this would allow you to attach an invoice')
  }
  deleteInvoice(invoice) {
    var result = confirm("Are you sure you want to delete this In? THIS CANNOT BE UNDONE");
    if (result) {
      this.projectService.deleteInvoice(this.project[0]._id, this.draw["name"], invoice).subscribe((res: any) => {
        console.log(res)
      });
      window.location.reload();
    }
  }

  addChecks() {
    window.alert("you will be able to add checks for this draw here")
  }

  uploadInvoices() {
    this.projectService.uploadInvoicesOnDraw(this.project[0]._id, this.draw["name"], this.records).subscribe((response: any) => {
      this.router.navigate(['/projects', this.id]);
      });
  }

  changeListener(files: FileList) {
    this.fileName = files.item(0).name
    if (files && files.length > 0 && files.item(0).name.endsWith(".csv")) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };
      this.showUpload = true;

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid draw file. Download template if needed.");
      this.csvReader.nativeElement.value = "";
      this.records = [];
      this.jsondatadisplay = '';
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord = {};
        csvRecord["company"] = currentRecord[0].trim().replace(/["]+/g, '');
        csvRecord["address"] = currentRecord[1].trim().replace(/["]+/g, '');
        csvRecord["costCode"] = currentRecord[2].trim().replace(/["]+/g, '');
        csvRecord["category"] = currentRecord[3].trim().replace(/["]+/g, '');
        csvRecord["invoiceNum"] = currentRecord[4].trim().replace(/["]+/g, '');
        csvRecord["invoiceAmt"] = Number(currentRecord[5].trim());
        csvRecord["taxId"] = currentRecord[6].trim().replace(/["]+/g, '');
        csvRecord["invoicePath"] = '';
        csvRecord["isPaid"] = false;
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }


  ngOnDestroy(): void {
    this.authService.addInvoiceRouterSubject.next(['/project/invoices'])
  }
}



