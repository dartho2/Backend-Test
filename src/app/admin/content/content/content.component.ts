import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  mode;
  contentId;
  contentForm;
  message;
  type = ['text', 'text_and_image', 'gallery', 'contact']
  bodyForm: FormGroup;
  constructor(public contenstService: ContentService,
    private _fb: FormBuilder,
    public route: ActivatedRoute) {
    this.initComp()
    
    this.buildForm(null)
    // this.buildForm()
  }


  ngOnInit() {
  }
  onAddContent() {
    if (this.mode === "edit") {
      this.contenstService.updateContent(this.bodyForm.value).subscribe(response => {
        this.message = response;
        this.contenstService.allert();
        //   window.setTimeout(function () { 
        //     $(".alert-success").fadeOut( 500, function() {
        //       $(this).hidden();
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
    // this.form.reset();
  }
  initComp() {
    console.log('init', this.contentForm)
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        this.contenstService.getContent(this.contentId).subscribe(res => {
          this.contentForm = res;
          this.buildForm(this.contentForm)

          console.log(this.contentForm)

          // this.bodyForm.patchValue(this.contentForm);
        });
      } else {
        this.mode = "create";
        this.contentId = null;
        this.buildForm(null)
      }
    });
  }
  buildForm(data: any): FormGroup {
    console.log(data)
    return this.bodyForm = this._fb.group({
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
  getContent(content: any[]) {
    console.log("get",content)
    return content ? content.map(contentBody => {
      return this._fb.group({
        title: [contentBody.title],
        lead: [contentBody.lead],
        text: [contentBody.text],
        signature: [contentBody.signature],
        button: [contentBody.button],
        date: [contentBody.date],
        reference: [contentBody.reference],
        decriptions: [contentBody.decriptions],
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
      image: this._fb.array(
        this.getImage(null)
      )
    })]
    // [
    //   new FormGroup({
    //     title: new FormControl,
    //     text: new FormControl,
    //   lead: new FormControl,
    //   signature: new FormControl,
    //   button: new FormControl,
    //   date: new FormControl,
    //   reference: new FormControl,
    //   decriptions: new FormControl,
    //   image: this._fb.array(
    //         this.getImage(null)
    //       )
    //   })
    // ]

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
  addC(content?: Content) {
    console.log("1",this.bodyForm);
    (<FormArray>this.bodyForm.controls['content']).push(
      new FormGroup({
        title: new FormControl,
        text: new FormControl,
      lead: new FormControl,
      signature: new FormControl,
      button: new FormControl,
      date: new FormControl,
      reference: new FormControl,
      decriptions: new FormControl,
      image: this._fb.array(
            this.getImage(null)
          )
      })
    )
    console.log("2",this.bodyForm)
    // let control = <FormArray>this.bodyForm.controls.content;
    // console.log(control)
    // control.push(
    //   this._fb.array([
    //     this._fb.group({
    //       title: 'dupa'
    //     })
    //   ])
    // )
    // let control = <FormGroup>this.bodyForm.controls.content;
    // console.log(control)
    // control.push(
    //   this._fb.array([
    //     this._fb.group({
    //       title: 'dupa'
    //     })
    //   ])
    // )
    // const control = <FormArray>this.bodyForm.controls['content'];
    // console.log(control)
    // console.log("form",this.getContent(null))
    // control.push(new FormArray(this.getContent(null)))
    // this.bodyForm.controls.content.push(this.getContent(null))
    // let control1 = <FormArray>this.bodyForm.controls.content;
    // let control = (<FormArray>this.bodyForm.controls['content'])
    // let answers = this.bodyForm.get(`content.${0}`) as FormArray;
    // answers.push(
    //   this._fb.array([])
    // )
    // console.log(answers)
    // console.log("1",control1)
    // console.log(control)
  }
}
