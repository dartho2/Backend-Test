import { Component, OnInit } from '@angular/core';
import { Karnet, Options, Package } from '../carnet.config'
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CarnetService } from '../carnet.service';

@Component({
  selector: 'app-carnet-create',
  templateUrl: './carnet-create.component.html',
  styleUrls: ['./carnet-create.component.scss']
})

export class CarnetCreateComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  selectedOptions;
  selectPackage;
  mode;
  bodyForm: FormGroup;
  selectedValue;
  options: Options[] = [{
    name: 'Pakiety',
    value: '',
  },
  {
    name: 'KARNETY ILOŚCIOWE',
    value: ''
  },
  {
    name: 'KARNET OPEN',
    value: ''
  },
  {
    name: 'TRENING PERSONALNY',
    value: ''
  },
  {
    name: 'PAKIETY SOLARIUM',
    value: ''
  }
  ]
  package: Package[] = [
    {
      amount: [true, true, true, true],
      name: '4 WIZYT',
      value: '320',
      stime: 0,
      time: 0
    },
    {
      amount: [true, true, true, true, true, true, true, true, true, true, true, true],
      name: '12 lekcji - 2 msc.',
      value: '149',
      stime: 0,
      time: 2
    },
    {
      name: '4 lekcje - 1 msc.',
      value: '60',
      stime: 0,
      amount: [true, true, true, true],
      time: 1
    },
    {
      name: '6 miesięcy',
      stime: 0,
      value: '83',
      amount: [],
      time: 6
    },
    {
      name: '3 miesięcy',
      value: '118',
      stime: 0,
      amount: [],
      time: 3
    },
    {
      name: '12 miesięcy',
      value: '139',
      stime: 0,
      amount: [],
      time: 12
    },
    {
      name: 'Siłowinia 6 msc',
      value: '59',
      stime: 0,
      amount: [],
      time: 6
    },
    {
      name: 'Siłowinia 3 msc',
      value: '84',
      stime: 0,
      amount: [],
      time: 3
    },
    {
      name: 'Siłowinia 1 msc',
      value: '99',
      stime: 0,
      amount: [],
      time: 1
    },
    {
      name: 'VACU 6 msc',
      value: '65',
      stime: 0,
      amount: [],
      time: 6
    },
    {
      name: 'VACU 3 msc',
      value: '92',
      stime: 0,
      amount: [],
      time: 3
    },
    {
      name: 'VACU 1 msc',
      value: '109',
      stime: 0,
      amount: [],
      time: 1
    },
    {
      name: 'SIŁOWNIA + VACU 6 msc',
      value: '83',
      stime: 0,
      amount: [],
      time: 6
    },
    {
      name: 'SIŁOWNIA + VACU 3 msc',
      value: '118',
      stime: 0,
      amount: [],
      time: 3
    },
    {
      name: 'SIŁOWNIA + VACU 1 msc',
      value: '139',
      stime: 0,
      amount: [],
      time: 1
    },
    {
      name: 'ZAJĘCIA GRUPOWE + VACU 6 msc',
      value: '83',
      stime: 0,
      amount: [],
      time: 6
    },
    {
      name: 'ZAJĘCIA GRUPOWE + VACU 3 msc',
      value: '118',
      stime: 0,
      amount: [],
      time: 3
    },
    {
      name: 'ZAJĘCIA GRUPOWE + VACU 1 msc',
      value: '139',
      stime: 0,
      amount: [],
      time: 1
    },
    {
      name: '12 WEJŚĆ - 2 msc.',
      value: '149',
      stime: 0,
      amount: [true, true, true, true, true, true, true, true, true, true, true, true],
      time: 2
    },
    {
      name: '8 WEJŚĆ - 1 msc.',
      value: '115',
      stime: 0,
      amount: [true, true, true, true, true, true, true, true],
      time: 1
    },
    {
      name: '4 WEJŚĆ - 1 msc.',
      value: '60',
      stime: 0,
      amount: [true, true, true, true],
      time: 1
    },
    {
      name: '10 x TRENING PERSONALNY',
      value: '700',
      stime: 0,
      amount: [true, true, true, true, true, true, true, true, true, true],
      time: 0
    },
    {
      name: '200 minut solarium - 6 msc.',
      value: '200',
      stime: 200,
      amount: [],
      time: 6
    },
    {
      name: '120 minut solarium - 3 msc.',
      value: '132',
      stime: 120,
      amount: 0,
      time: 3
    },
    {
      name: '60 minut solarium - 2 msc.',
      value: '72',
      stime: 60,
      amount: 0,
      time: 2
    }
  ]
  karnet: Karnet[] =
    [
      {
        type: 'text',
        name: 'PDTR',
        value: ''
      },
      {
        type: 'text',
        name: 'Joga',
        value: '',
      },
      {
        type: 'text',
        name: '7mepoty',
        value: ''
      }
    ];

  constructor(private _fb: FormBuilder, private route: ActivatedRoute, private router: Router, private carnetService: CarnetService) {
    this.buildForm(null)
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idCarnet")) {
        this.mode = "edit";
      } else {
        this.mode = "create";
      }
    });
  }
  onAddContent() {
    if (this.mode === "edit") {
    
    } else {
      delete this.bodyForm.value._id
      this.carnetService.createCarnet(this.bodyForm.value).subscribe(()=>
      {
        this.router.navigate(["../"], {relativeTo: this.route});
      })
      
    };
  }

  get type() {
    return <FormArray>this.bodyForm.get('type');
  }
  buildForm(data: any): FormGroup {
    return this.bodyForm = this._fb.group({
      name: [data ? data.name : ''],
      surname: [data ? data.surname : ''],
      type: this._fb.array(
        this.getType(data ? data.type : '')
      ),
    })
  }
  getType(type: any) {
    return type ? type.map(typeBody => {
      return this._fb.group({
        name: [typeBody.name ? typeBody.name : ''],
        options: [typeBody.options ? typeBody.options : ''],
        sdata: [typeBody.sdata ? typeBody.sdata : ''],
        edata: [typeBody.edata ? typeBody.edata : ''],
        package: [typeBody ? typeBody.package : '',]
        // package: this._fb.group({
        //   name: [typeBody ? typeBody.package.name : '',],
        //   time: [typeBody ? typeBody.package.time : '',],
        //   stime: [typeBody ? typeBody.package.stime : '',],
        //   amount: this._fb.array(
        //     this.getAmount(typeBody ? typeBody.package.amount : '')
        //   ),
        //   value: [typeBody ? typeBody.package.value : '',],
        // })
      })
    }) : [this._fb.group({
      name: '',
      options: '',
      sdata: '',
      edata: '',
      package: '',
      // package: this._fb.group({
      //   name: '',
      //   stime: '',
      //   time: '',
      //   amount: this._fb.array([]),
      //   value: ''
      // })
    })]
  }

  getAmount(amountItems: any) {
    return amountItems ? amountItems.map(amountBody => {
      return [amountBody ? amountBody : '']
    }) : [this._fb.control('')]
  }
  onChange(selectedValue) {
    console.log(selectedValue)
  }
}
