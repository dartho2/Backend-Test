import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';
import { isObject } from 'util';
import { map } from 'rxjs/operators';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit {
  @Input() contentData: any;
  @Input() sectionID: any;
  @Output() text_
  aligns = ['left', 'center', 'right', 'justify'];
  type = ['text', 'text_and_image', 'schedule', 'table', 'gallery', 'contact'];
  text_type;
  mode;
  typeID = '';
  createdID;
  contentId;
  dataID;
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
  onChangeTextType(data) {
      if (!data) {
        return null
      } else if (data === 'text') {
        return this.text_type = [
          {"label": "block_box","name": "block1"}, 
          {"label": "block-t-t", "name": "block2"},
          {"label": "block-t-a'", "name": "block3"},
          {"label": "block_q", "name": "block4"}
        ]
      } 
      else if (data === 'text_and_image') {
        return this.text_type = [
          {"label": "block_box","name": "block1"}, 
          {"label": "referencje", "name": "referencje"},
          {"label": "block-o-t'", "name": "block3"},
          {"label": "block-o", "name": "block4"},
          {"label": "block-o-s", "name": "block5"}
        ] 
      } else if (data === 'table' || data === 'schedule' ) {
        return this.text_type = [
          {"label": "price-l","name": "cennik1"}, 
          {"label": "schedule", "name": "grafik"},
          {"label": "table-o-a'", "name": "cennik2"},
          {"label": "price-l-n", "name": "cennik3"}
        ] 
      } 
      else if (data === 'list' || data === 'gallery' || 'contact') {
        return this.text_type = [
          {"label": "default","name": "default"}
        ] 
      }
       else {
        return null
      }
    
  }
  onChangeFormDisplay(name){
console.log(name , "name")
  }
  ngOnInit() {
    this.initComp()
  }
  changes(type) {
    if(this.mode === 'create' || this.sectionID){
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
      if(this.sectionID){
        this.contenstService.createContent(this.bodyForm.value).pipe(
        map((res: Response) => {
          this.createdID = res;
          this.contenstService.getSections(this.sectionID).subscribe(section =>{
            var jsonSection;
            jsonSection = section
            jsonSection.data.push(this.createdID._id) ;
            this.contenstService.createContentToSections(jsonSection, this.sectionID).subscribe(response =>{
              this.message = response;
              this.contenstService.allert()
            })
          })
        }))
        .subscribe(response => {
          this.message = response;
          this.contenstService.allert();
        }) 
      } else {
      this.contenstService.createContent(this.bodyForm.value).subscribe(response => {
        this.message = response;
        this.contenstService.allert();
     
      }) 
    }
    };
  }

  initComp() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId") || this.contentData) {
        this.mode = "edit";
        if(this.contentData) {
          this.contentId = this.contentData._id
        } else {
        this.contentId = paramMap.get("contentId");
      }
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
        text_type: [data ? data.styles.text_type : '',],
        list_typ: [data ? data.styles.list_typ : '',],
        text_align: [data ? data.styles.text_align : '',]
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
