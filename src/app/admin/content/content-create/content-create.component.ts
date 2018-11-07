import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit {

  aligns = ['left', 'center', 'right', 'justify'];
  type = ['text', 'text_and_image', 'table', 'gallery', 'contact']
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
  // get headers(): FormArray { 
  //   console.log('ass')
  //   return this.bodyForm.get('headers') as FormArray; }

  ngOnInit() {
    this.initComp()
  }
  change(type) {
    this.typeID = type
  }
  onAddContent() {
    if (this.mode === "edit") {
      this.contenstService.updateContent(this.bodyForm.value).subscribe(response => {
        this.message = response;
        this.contenstService.allert()
        // window.setTimeout(function () {
        //   $(".alert-success").fadeOut(500, function () {
        //     $(this).hidden();
        //   });
        // }, 500)

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
    return this.bodyForm = this._fb.group({
      _id: [data ? data._id : null],
      type: [data ? data.type : '',],
      tag: [data ? data.tag : '',],
      styles: this._fb.group({
        text_type: [data ? data.styles.text_type : '',]
      }),
      content: this._fb.array(
        this.getContent(data ? data.content : null)
      )
    })
  }
  getContent(content: any) {
    return content ? content.map(contentBody => {
      return this._fb.group({
        title: [contentBody.title],
        lead: [contentBody.lead ? contentBody.lead : ''],
        text: [contentBody.text],
        signature: [contentBody.signature],
        button: [contentBody.button],
        date: [contentBody.date],
        reference: [contentBody.reference],
        decriptions: [contentBody.decriptions],
        // headers: [contentBody.headers],
        headers: this._fb.array(contentBody.headers),
        // headers: this._fb.array(content.headers.map(contentBody => {  return contentBody})),
        // headers: this._fb.array(contentBody.headers),
        data: this._fb.array(
        []
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
        headers: this._fb.array([]),
        data:  this._fb.array([]),
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
    console.log(i)
    const control = <FormArray>this.bodyForm.controls['content'];
    control.removeAt(i);
  }
}
