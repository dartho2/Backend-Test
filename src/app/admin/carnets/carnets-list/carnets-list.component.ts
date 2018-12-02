import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  type: string;
  data: string;
  edata: string;
  used: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Radosław Chwast', type: 'nie wiem', data: '1-12-2018', edata: '12-12-2018', used: 'nie wiem'},
  {position: 2, name: 'Maja Bednarczyk', type: 'nie wiem', data: '1-12-2018', edata: '12-13-2018', used: 'nie wiem'},
  {position: 3, name: 'Paweł W', type: 'nie wiem', data: '1-12-2018', edata: '12-12-2018', used: 'nie wiem'},
  {position: 4, name: 'Agata K', type: 'nie wiem', data: '1-11-2018', edata: '12-13-2018', used: 'nie wiem'},
  {position: 5, name: 'Mikolaj', type: 'nie wiem', data: '1-02-2018', edata: '12-12-2018', used: 'nie wiem'},
  {position: 6, name: 'Gargamel', type: 'nie wiem', data: '1-11-2018', edata: '12-13-2018', used: 'nie wiem'},
  {position: 7, name: 'Abracht', type: 'nie wiem', data: '1-12-2017', edata: '12-11-2018', used: 'nie wiem'},
  {position: 8, name: 'Durgabol', type: 'nie wiem', data: '23-12-2016', edata: '02-13-2018', used: 'nie wiem'},
  {position: 9, name: 'Elmajser', type: 'nie wiem', data: '11-12-2017', edata: '01-12-2018', used: 'nie wiem'},
  {position: 10, name: 'Roboli', type: 'nie wiem', data: '1-12-2016', edata: '12-13-2018', used: 'nie wiem'},
  {position: 11, name: 'Lord ', type: 'nie wiem', data: '22-12-2018', edata: '12-12-2018', used: 'nie wiem'},
  {position: 12, name: 'Roboli boboli', type: 'nie wiem', data: '1-13-2018', edata: '12-13-2018', used: 'nie wiem'},
  {position: 13, name: 'Kal-torak', type: 'nie wiem', data: '1-12-2018', edata: '12-12-2018', used: 'nie wiem'},
  {position: 14, name: 'Michalek', type: 'nie wiem', data: '1-12-2018', edata: '12-13-2018', used: 'nie wiem'},
  {position: 15, name: 'R Marvel', type: 'nie wiem', data: '1-12-2018', edata: '12-12-2018', used: 'nie wiem'},
  {position: 16, name: 'Diablo', type: 'nie wiem', data: '1-12-2018', edata: '12-13-2018', used: 'nie wiem'},
  {position: 17, name: 'Morrowind', type: 'nie wiem', data: '1-12-2018', edata: '12-12-2018', used: 'nie wiem'},
  {position: 18, name: 'Dragon boll', type: 'nie wiem', data: '1-12-2018', edata: '12-13-2018', used: 'nie wiem'}
];
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-carnets-list',
  templateUrl: './carnets-list.component.html',
  styleUrls: ['./carnets-list.component.scss']
})
export class CarnetsListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'type', 'data', 'edata', 'used'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  value: string;
  viewValue: string;
  foods: Food[] = [
    {value: 'Karnet1', viewValue: 'KARNETY ILOŚCIOWE'},
    {value: 'Karnet2', viewValue: 'KARNET OPEN'},
    {value: 'Karnet3', viewValue: 'TRENING PERSONALNY'},
    {value: 'Karnet4', viewValue: 'PAKIETY SOLARIUM'},
  ];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
