import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarnetService } from '../carnet.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-carnets-list',
  templateUrl: './carnets-list.component.html',
  styleUrls: ['./carnets-list.component.css']
})
export class CarnetsListComponent implements OnInit {


  constructor() { }

  ngOnInit() {}
}
 

