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
 type = ['text','text_and_image','gallery', 'contact']
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
initComp(){
  console.log('init',this.contentForm)
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
    }
  });
}
buildForm(data:any): FormGroup{
  console.log(data)
return this.bodyForm = this._fb.group({
  type: [data? data.type:'',],
  tag: [data? data.tag:'',],
  styles: this._fb.group({
    text_type: [data? data.styles.text_type:'',]
  }),
  content: this._fb.array(
    this.getContent(data? data.content:null)
  )
})
}
getContent(content:any[]): FormGroup[]{
  return content? content.map(contentBody=>{
     return this._fb.group({
      title: [ contentBody.title],
      lead: [ contentBody.lead],
      text: [ contentBody.text],
      signature: [ contentBody.signature],
      button: [ contentBody.button],
      date: [ contentBody.date],
      reference: [ contentBody.reference],
      decriptions: [ contentBody.decriptions],
      image: this._fb.array(
        this.getImage(contentBody? contentBody.image:null)
      )
    });
  }):[this._fb.group({
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
}
getImage(image:any[]): FormGroup[]{
  return image? image.map(imageBody=>{
    return this._fb.group({
      url: [imageBody.url],
      title: [imageBody.title]
    });
}):[this._fb.group({
  url: '',
  title: ''
})]
}

}
