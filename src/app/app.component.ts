import { Component } from '@angular/core';
import '@angular/localize/init';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pdfMake: any;
  firstName = 'henry';
  lastName = 'kissinger';
  number = 746547;
  // lazy load pdf lib which is over 3mb
  loadPdfMaker() {
    if (!this.pdfMake) {
      // lazyLoading in component ts is not supported by default pre-angular 9
      // its preferable to lazy load because library is +3.7MB
      // const pdfMakeModule = await import('pdfmake/build/pdfmake');
      // const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      // this.pdfMake = pdfMakeModule.default;
      // this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

   generatePdf() {
    // this.loadPdfMaker();
    // const def = { content: 'A sample PDF document generated using Angular and PDFMake' };
    // this.pdfMake.createPdf(def).open();
    // in ie11 you cannot open pdf to new tab without downloading
    const documentDefinition = { content: $localize`:@@reference.number: ${this.number}` };
    pdfMake.createPdf(documentDefinition).download();
  }
}
