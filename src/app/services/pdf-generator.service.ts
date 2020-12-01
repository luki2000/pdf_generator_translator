import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  public pdfMake: any;
  constructor() { }


    // lazy load pdf lib which is over 3mb
    async loadPdfMaker() {
      if (!this.pdfMake) {
        // lazyLoading in component ts is not supported by default pre-angular 9
        // its preferable to lazy load because library is +3.7MB
        const pdfMakeModule = await import('pdfmake/build/pdfmake');
        const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
        this.pdfMake = pdfMakeModule.default;
        this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
      }
    }

    async generatePdf(data) {
      await this.loadPdfMaker();
      // in ie11 you cannot use open method which opens new tab with df, so we use download instead
      const documentDefinition = { content: data };
      this.pdfMake.createPdf(documentDefinition).download();
    }
}
