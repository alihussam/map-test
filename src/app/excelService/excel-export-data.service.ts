import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { WebConstants } from '../util/web.constants';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportDataService {
  constructor() { }

  exportExcel(excelData: any): void {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');

    //Adding Header Row
    let headerRow = worksheet.addRow(header);

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000000' },
        bgColor: { argb: '' }
      }

      cell.font = {
        bold: true,
        color: { argb: 'B5420F' },
        size: 12
      }
    })

    // Adding Data with Conditional Formatting
    data.forEach(d => {
      worksheet.addRow(d);
    });

    if (header && header.length > 0) {
      for (let i = 1; i <= header.length; i++) {
        worksheet.getColumn(i).width = 15;
      }
    }
    
    worksheet.addRow([]);

    //Merge Cells
    /*worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

    let imageRow = footerRow.number + 2;

    if (image) {
      worksheet.mergeCells(`A${imageRow}:H${imageRow + 8}`);
      var imageId2 = workbook.addImage({
        base64: image,
        extension: 'png'
      });
      worksheet.addImage(imageId2, `A${imageRow}:H${imageRow + 8}`);
    }*/

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })

  }
}