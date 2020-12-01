import { Component, OnInit } from '@angular/core';
import '@angular/localize/init';
import { PdfGeneratorService } from './services/pdf-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public referenceNumberText;
  public number = 476476;


  constructor(private pdfService: PdfGeneratorService) {}

  ngOnInit() {
  }

  generatePdf() {
    this.referenceNumberText =  $localize`:@@reference_number_text: reference number: ${this.number}:reference_number:`;
    this.pdfService.generatePdf(this.referenceNumberText);
  }
}
