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
  aligns = ['left','center','right', 'justify'];
  type = ['text','text_and_images','gallery']
  private mode = 'create';
  content: Content;
  message;
  form: FormGroup;
  selectedDay: string = '';
  private contentId: string;
  constructor(
    public contenstService: ContentService,
    private _fb: FormBuilder,
    public route: ActivatedRoute) { }

    radioChange (event: any) {
      this.selectedDay = event.target.value;
    }
    get items(){
      return this.form.get('items') as FormArray;
    }
    get formData() { return <FormArray>this.form.get('content'); }
  ngOnInit() {
    $(document).ready(function() {
      $('select[name=simple-select]').select2Buttons();
   });
    
   this.initForm(0);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        this.contenstService.getContent(this.contentId).subscribe((res: Content) => {
          this.content = res;
          this.initForms(this.content.content);
          this.form.patchValue(this.content);
        });
      } else {
        this.mode = "create";
        this.contentId = null;
        delete this.form.value._id
      }
    });

  }
  
  initForms(content){
    this.initForm(content.length)
  }
  initForm(x: number){
    var arr = [];
    for(var i =0; x> i; i++)
    {
      arr.push(this.initContent())
    }
    this.form = this._fb.group({
      _id: '',
      type: '',
      styles: this._fb.group({
        float: '',
        text_type: '',
        list_type: '',
        text_align: ''
      }),
      content: this._fb.array(
        arr
      ),
      created_at: '',
      updated_at: ''
    });
  }
  onAddContent() {
    if (this.mode === "edit") {
      this.contenstService.updateContent(this.form.value).subscribe(response => {
        this.message = response;
      })
    } else {
      this.contenstService.createContent(this.form.value).subscribe(response => {
        this.message = response;
      })
    };
    // this.form.reset();
  }
 
  initContent() {
    
    return this._fb.group({
      title: '',
      text: new FormControl(''),
      lead: '',
      signature: '',
      button: '',
      date: '',
      reference: '',
      decriptions: '',
      tag: '',
      items: this._fb.array([
        this._fb.control('')
      ]),
      images: this._fb.array([
        this.initImages()
      ]),
      videos: this._fb.array([
        this.initVideo()
      ])
    });
  }
 
  initImages() {
    return this._fb.group({
      url: "",
      title: ""
    })
  }
  initVideo() {
    return this._fb.group({
      url: "",
      title: "",
      description: ""
    })
  }

  addContent() {
    const control = <FormArray>this.form.controls['content'];
    control.push(this.initContent());
  }
  removeContent(i: number) {
    const control = <FormArray>this.form.controls['content'];
    control.removeAt(i);
  }

}
