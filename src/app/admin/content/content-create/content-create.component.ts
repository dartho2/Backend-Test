import { Component, OnInit, Input, OnDestroy, OnChanges,  } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { isObject } from 'util';
import { map } from 'rxjs/operators';
import { PortalService } from '../../portals/portal.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit, OnDestroy, OnChanges {
  @Input() contentData: any;
  @Input() sectionID: any;
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
  constructor(public contenstService: ContentService, private portalServices: PortalService,
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
          {"label": "default","name": "default-new"}
        ]
      } 
      else if (data === 'text_and_image') {
        return this.text_type = [
          {"label": "default","name": "default-new"}, 
          {"label": "referencje", "name": "referencje"},
          {"label": "text_image_r", "name": "treners"}
        ] 
      } else if (data === 'table' || data === 'schedule' ) {
        return this.text_type = [
          {"label": "price-l","name": "cennik-default"}, 
          {"label": "schedule", "name": "grafik"},
          {"label": "table-o-a'", "name": "tabela-test"},
          {"label": "price-l-n", "name": "cennik-z-podpisem"}
        ] 
      } else if (data === 'gallery' ) {
        return this.text_type = [
          {"label": "default","name": "default-new"},
        ] 
      } 
      else if (data === 'list' || 'contact') {
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
    console.log('app-create')
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
      if (this.contentData) {
        console.log('contentData', this.contentData)
        this.mode = "edit";
        if(this.contentData) {
          this.contentId = this.contentData._id
        } else {
        this.contentId = paramMap.get("contentId");
      }
        this.contenstService.getContent(this.contentId).subscribe(res => {
          console.log('create-comp')
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
      styles: this._fb.group({
        float: [data ? data.styles.float : '',],
        text_type: [data ? data.styles.text_type : '',],
        list_typ: [data ? data.styles.list_typ : '',],
        text_align: [data ? data.styles.text_align : '',]
      }),
      content: this._fb.array(
        this.getContent(data ? data.content : null),
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
        contact: this._fb.array(
          this.getContact(contentBody ? contentBody.contact : null)
      ),
        items: this._fb.array(
          // contentBody.data.map(dataResult => { return dataResult})
          contentBody.items ? contentBody.items : '' 
        ),
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
        ),
        videos: this._fb.array(
          this.getVideo(contentBody ? contentBody.videos : null)
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
        contact: this._fb.array(
          this.getContact(null)
      ),
        items: this._fb.array(['']),
        data: this._fb.array([this._fb.array([''])]),
        image: this._fb.array(
          this.getImage(null)
        ),
        videos:this._fb.array(
          this.getVideo(null)
        ),
      })]

  }
  getContact(contact: any): FormGroup[] { 
    return contact ? contact.map(contactBody => {
      return this._fb.group({
        phone:[contactBody.phone? contactBody.phone : ""],
        email:[contactBody.email? contactBody.email : ""],
        reference:[contactBody.reference? contactBody.reference : ""]
      })
    }): [this._fb.group({
      phone: '',
      email: '',
      reference: ''
    })]
  }
  getVideo(video: any): FormGroup[] {
    return video ? video.map(videoBody => {
      return this._fb.group({
        url: [videoBody.url],
        title: [videoBody.title],
        description: [videoBody.description],
      });
    }) : [this._fb.group({
      url: '',
      title: '',
      description: ''
    })]
  }
  getImage(image: any[]): FormGroup[] {
    return image ? image.map(imageBody => {
      return this._fb.group({
        url: [imageBody.url],
        title: [imageBody.title],
        description: [imageBody.description? imageBody.description : '']
      });
    }) : [this._fb.group({
      url: '',
      title: '',
      description: ''
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
  ngOnDestroy(){
    console.log('destr')
    this.contentData = null
  }
  ngOnChanges(){
    console.log('change')
  }
  
}
