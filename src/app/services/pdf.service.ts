import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor() { }

  async mergePdfs(pdfsToMerge: ArrayBuffer[]) {
    const mergedPdf = await PDFDocument.create();
    const promiseArr = [];
    pdfsToMerge.forEach(pdfToMerge => {
      const promise = new Promise((resolve, reject) => {
        PDFDocument.load(pdfToMerge).then(pdf => {
          mergedPdf.copyPages(pdf, pdf.getPageIndices()).then(copiedPages => {
            resolve(copiedPages);
          });
        });
      });
      promiseArr.push(promise);
    });

    await Promise.all(promiseArr).then(results => {
      results.forEach(pagesArray => {
        pagesArray.forEach(page => {
          mergedPdf.addPage(page);
        });
      })
    });
    const mergedPdfFile = await mergedPdf.save();
    return mergedPdfFile;
  }

  blobToImageObject(imageBlob) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const url = window.URL.createObjectURL(new Blob([imageBlob]));
      const image = new Image();
      image.src = url;

      image.onload = (e: any) => {
        const height = e.path[0].height;
        const width = e.path[0].width;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0);
        const imageObj = { type: 'image', image, imageData: canvas.toDataURL('image/jpeg'), width: width, height: height }
        resolve(imageObj);
        canvas.remove();
      }
    })
  }
}
