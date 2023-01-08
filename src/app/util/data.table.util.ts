/**
 * @author MSA
 */

import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

export class DataTableUtil<T> extends MatTableDataSource<T> {
  constructor(private rows: Observable<T[]>) {
    super();
  }
}

export function updateMatTableDataSource(dataSource: any, paginator: any, sort: any, dataList: any): void {
  dataSource = new MatTableDataSource<any>(dataList);
  dataSource.paginator = paginator;
  dataSource.sort = sort;
  return dataSource;
}