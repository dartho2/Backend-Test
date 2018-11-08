import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ContentCreateComponent } from '../content-create/content-create.component'
import { isObject } from 'util';


@Component({
    selector: 'schedule-content',
    templateUrl: './schedule-content.component.html',
    styleUrls: ['../content-create/content-create.component.css']
})
export class ScheduleContentomponent implements OnInit {
    @Input() i: any;
    @Input('group')

    public contentForm: FormGroup;
    constructor(public contentCreate: ContentCreateComponent,
        public _fb: FormBuilder) { }
    ngOnInit() { }

    getDataType(data) {
        if (!data) {
            return 'string';
        } else if (Array.isArray(data)) {
            return 'array'
        } else if (isObject(data)) {
            return 'object'
        } else {
            return 'string'
        }
    }
    scheduleContent() {
        return this._fb.group({
            background_color: '',
            content: ' ',
            extra_content: ''
        })
    }
    addScheduleRow(control) {
        control.push(
            this._fb.array([
                this.scheduleContent()
            ])
        )
    }
    addScheduleColumn(control, indexX, indexY) {
        control.at(indexY).insert(indexX + 1, this.scheduleContent())
    }
    removeScheduleColumn(control, indexX, indexY) {
        if (indexX !== 0) {
            control.at(indexY).removeAt(indexX)
        } else {
            this.removeScheduleRow(control, indexY)
        }
    }
    removeCellTable(control, indextd, indextr) {
        if (indextd !== 0) {
            control.at(indextr).removeAt(indextd)
        } else {
            this.removeScheduleRow(control, indextr)
        }
    }
    removeScheduleRow(control, index) {
        control.removeAt(index)
    }
    addSubCellTable(control, indexX, indexY, value) {
        control.at(indexY).removeAt(indexX)
        control.at(indexY).insert(indexX, this._fb.array([value, ""]))
    }
    addHeader(control, index) {
        control.insert(index + 1, this._fb.control(''))

    }

}