import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class ExcelExportService {
  constructor() { }

  exportExcel(excelData: any): void {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;
    const image = excelData.image;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');


    //Add Row and formatting
    worksheet.mergeCells('A1', 'F4');

    let titleRow = worksheet.getCell('C1');

    titleRow.value = title

    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' }
    }

    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Date
    worksheet.mergeCells('G1:H4');

    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('G1');

    dateCell.value = date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }

    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }

    //Blank Row 
    worksheet.addRow([]);

    //Adding Header Row
    let headerRow = worksheet.addRow(header);

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }

      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
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

    //Footer Row
    let footerRow = worksheet.addRow(['© 2021 Conure BinWise | All Rights Reserved.']);

    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' }
    };

    footerRow.alignment = { horizontal: 'center' }

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:H${footerRow.number}`);

    let imageRow = footerRow.number + 2;

    if (image) {
      worksheet.mergeCells(`A${imageRow}:H${imageRow + 8}`);
      var imageId2 = workbook.addImage({
        base64: image,
        extension: 'png'
      });
      worksheet.addImage(imageId2, `A${imageRow}:H${imageRow + 8}`);
    }

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, title + '.xlsx');
    })

  }
}
