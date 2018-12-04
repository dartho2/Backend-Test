import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator, MatSort} from '@angular/material';
import { CarnetService } from '../carnet.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Carnet } from '../carnet.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-carnets-list',
  templateUrl: './carnets-list.component.html',
  styleUrls: ['./carnets-list.component.scss']
})
  
  // <!-- !!! 1 !!!! -->

// export class CarnetsListComponent implements OnInit {
//   dataSource = new CarnetDataSource(this.carnetService);
//   displayedColumns = ['name', 'surname', 'tname', 'value', 'amount'];
//   constructor(private carnetService: CarnetService) { }

//   ngOnInit() {}

 
// }
// export class CarnetDataSource extends DataSource<any> {
//   constructor(private carnetService: CarnetService) {
//     super();
//   }
//   connect(): Observable<Carnet[]> {
//     return this.carnetService.getCarnet();
//   }
  
//   disconnect() {}
// }
  
  // <!-- !!! 1 !!!! -->
  export class CarnetsListComponent implements AfterViewInit, OnInit {
    carnetsData;
    dataSource = new MatTableDataSource(this.carnetsData);
    displayedColumns: string[] = ['name', 'surname', 'tname', 'value', 'amount'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(private carnetService: CarnetService) { 
      carnetService.getCarnet().subscribe(
      data => {
       this.carnetsData = data;
       this.dataSource.data = this.carnetsData;  
      });
      }
      // ngAfterViewInit() {
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      //  }
      ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       }

    ngOnInit() {
      // this.dataSource.paginator = this.paginator;
    }
  }