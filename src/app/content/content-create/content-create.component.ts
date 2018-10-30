import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContentService } from '../content.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Content } from '../content.model';

@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent implements OnInit {
  private mode = 'create';
  content: Content;
  form: FormGroup;
  private contentId: string;
  constructor(
    public contenstService: ContentService,
    private _fb: FormBuilder,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this._fb.group({
      id: '',
      type: '',
      styles: {
        float: '',
        text_type: '',
        list_type: ''

      },
      content: this._fb.group({
        title: '',
        text: '',
        image: '',
        lead: '',
        signature: "",
        button: '',
        data: ''
        // reference: '',
        // decriptions: ''
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("contentId")) {
        this.mode = "edit";
        this.contentId = paramMap.get("contentId");
        this.contenstService.getContent(this.contentId).subscribe(content => {
          console.log(content)
          // this.content = res
          this.content = {
            id: content._id,
            type: content.type,
            styles: {
              float: content.styles.float,
              text_type: content.styles.text_type,
              list_type: content.styles.list_type
            },
            content: {
              title: content.content.title,
              text: content.content.text,
              image: content.content.image,
              lead: content.content.lead,
              signature: content.content.signature,
              button: content.content.button,
              data: content.content.data,
              // reference: content.content.reference,
              // decriptions: content.content.decriptions
            }
          };
          this.form.setValue({
            id: content._id,
            type: this.content.type,
            styles: {
              float: this.content.styles.float ? this.content.styles.float : '',
              text_type: this.content.styles.text_type ? this.content.styles.text_type : '',
              list_type: this.content.styles.list_type ? this.content.styles.list_type : ''
            },
            content: {
              title: this.content.content.title,
              text: this.content.content.text,
              image: this.content.content.image ? this.content.content.image : '',
              lead: this.content.content.lead ? this.content.content.lead : '',
              signature: this.content.content.signature ? this.content.content.signature : '',
              button: this.content.content.button ? this.content.content.button : '',
              data: this.content.content.data ? this.content.content.data : '',
              // reference: this.content.content.reference ? this.content.content.reference : '',
              // decriptions: this.content.content.decriptions ? this.content.content.decriptions : '',
            }
          });
        });
      } else {
        this.mode = "create";
        this.contentId = null;
      }
    });

  }
  onAddContent() {

    if (this.mode === "edit") {
      console.log(this.form.value.content.title, "title")
      console.log(this.form.value.content.text, "text")
      console.log(this.form.value.type, "type")
      console.log(this.contentId, "id")
      this.contenstService.updateContent(
        this.contentId,
        this.form.value.type,
        this.form.value.content.title,
        this.form.value.content.text,
        this.content.content.image,
        this.content.content.lead,
        this.content.styles.float,
        this.content.styles.list_type,
        this.content.styles.text_type,
        this.content.content.signature,
        this.content.content.button,
        this.content.content.data,
      );
    }
    // this.form.reset();

  }

}
