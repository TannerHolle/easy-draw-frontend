import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/company/company.service';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-draw-invoices-upload',
  templateUrl: './draw-invoices-upload.component.html',
  styleUrls: ['./draw-invoices-upload.component.scss']
})
export class DrawInvoicesUploadComponent implements OnInit {
  drawInvoicesArray = [];
  projectId;
  drawId;

  constructor(private projectService: ProjectService, private companyService: CompanyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.projectId = routeParams.id;
      this.drawId = routeParams.drawid;
    });
    this.drawInvoicesArray = this.companyService.drawInvoicesArray;
  }

  saveInvoices() {
    this.projectService.uploadInvoicesOnDraw(this.projectId, this.drawId, this.drawInvoicesArray).subscribe((response: any) => {
      this.router.navigate(['/projects', this.projectId]);
    });
  };

  deleteInvoice(index) {
    this.drawInvoicesArray.splice(index, 1);
  }
}
