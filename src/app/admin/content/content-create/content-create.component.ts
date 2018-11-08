import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';
import { isObject } from 'util';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit {

  aligns = ['left', 'center', 'right', 'justify'];
  type = ['text', 'text_and_image', 'schedule', 'table', 'gallery', 'contact']
  mode;
  typeID = '';
  contentId;
  contentForm;
  message;
  bodyForm: FormGroup;
  constructor(public contenstService: ContentService,
    private _fb: FormBuilder,
    public route: ActivatedRoute) {

    this.buildForm(null)

  }
  // Add for abstract problem
  get content() {
    return <FormArray>this.bodyForm.get('content');
  }

  ngOnInit() {
    this.initComp()
  }
  changes(type) {
    if(this.mode === 'create'){
    this.typeID = type
  } else {
    this.message = 'Nie można zmienić edytowanego Formatu';
    this.contenstService.allert()
    this.typeID = this.typeID
  
  }
  }
  onAddContent() {
    if (this.mode === "edit") {
      this.contenstService.updateContent(this.bodyForm.value).subscribe(response => {
        this.message = response;
        this.contenstService.allert()
        })
    } else {
      delete this.bodyForm.value._id
      this.contenstService.createContent(this.bodyForm.value).subscribe(response => {
        this.message = response;
        this.contenstService.allert();
      })
    };
  }
  initComp() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        this.contenstService.getContent(this.contentId).subscribe(res => {
          this.contentForm = res;
          this.typeID = this.contentForm.type;
          this.buildForm(this.contentForm)

        });
      } else {
        this.mode = "create";
        this.contentId = null;
      }
    });
  }
  buildForm(data: any): FormGroup {
    console.log(data)
    return this.bodyForm = this._fb.group({
      _id: [data ? data._id : null],
      type: [data ? data.type : '',],
      styles: this._fb.group({
        float: [data ? data.styles.float : '',],
        text_type: [data ? data.styles.text_type : '',]
      }),
      content: this._fb.array(
        this.getContent(data ? data.content : null)
      ),
      tags: this._fb.array(
        this.getTags(data ? data.tags : null)
      ),
    })
  }
  getTags(tagsItems: any) {
    return tagsItems? tagsItems.map(tagsBody => {
      return [tagsBody? tagsBody : '' ]
    }) : [this._fb.control('')]
  }
  getContent(content: any) {
    return content ? content.map(contentBody => {
      return this._fb.group({
        title: [contentBody.title ? contentBody.title : ''],
        lead: [contentBody.lead ? contentBody.lead : ''],
        text: [contentBody.text ? contentBody.text : ''],
        signature: [contentBody.signature ? contentBody.signature : ''],
        button: [contentBody.button ? contentBody.button : ''],
        date: [contentBody.date ? contentBody.date : ''],
        reference: [contentBody.reference ? contentBody.reference : ''],
        decriptions: [contentBody.decriptions ? contentBody.decriptions : ''],
        headers: this._fb.array(contentBody.headers ? contentBody.headers : ''),
        data: this._fb.array(
          contentBody.data.map(dataResult => {
            return this._fb.array(
              dataResult.map(arrayResult => {
                if (Array.isArray(arrayResult)) {
                  return this._fb.array(arrayResult)
                }
                if (isObject(arrayResult)) {
                  return this._fb.group({
                    background_color: [arrayResult.background_color],
                    content: [arrayResult.content],
                    extra_content: [arrayResult.extra_content]
                  })
                }
                //  CENNIK OBJECT
                // if (Array.isArray(arrayResult)) {
                //   return this._fb.array(arrayResult)
                // }
                return arrayResult
              })

            )
          }
          )
        ),
        image: this._fb.array(
          this.getImage(contentBody ? contentBody.image : null)
        )
      });
    }) :
      [this._fb.group({
        title: '',
        text: '',
        lead: '',
        signature: '',
        button: '',
        date: '',
        reference: '',
        decriptions: '',
        headers: this._fb.array(['']),
        data: this._fb.array([this._fb.array([''])]),
        image: this._fb.array(
          this.getImage(null)
        )
      })]

  }

  getImage(image: any[]): FormGroup[] {
    return image ? image.map(imageBody => {
      return this._fb.group({
        url: [imageBody.url],
        title: [imageBody.title]
      });
    }) : [this._fb.group({
      url: '',
      title: ''
    })]
  }
  addContent() {
    (this.getContent(null).map(addForm => {
      (<FormArray>this.bodyForm.controls['content']).push(
        addForm
      );
    }))
  }

  removeContent(i: number) {
    const control = <FormArray>this.bodyForm.controls['content'];
    control.removeAt(i);
  }

  removeTag(i: number) {
    const controls = <FormArray>this.bodyForm.controls['tags'];
    controls.removeAt(i);
  }
  addTag() {
    const controls = <FormArray>this.bodyForm.controls['tags'];
    controls.push(this._fb.control(''))
  }

}
