import { Component, OnInit } from '@angular/core';
import { Karnet } from '../carnet.config'
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-carnet-create',
  templateUrl: './carnet-create.component.html',
  styleUrls: ['./carnet-create.component.scss']
})

export class CarnetCreateComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  selectedValue;
  selectedPackage;
  karnet: Karnet[] =
    [
      {
        type: 'text',
        name: 'PDTR',
        value: '',
        options: [{
          type: 'text',
          name: 'Pakiety',
          value: '',
          package: [{
            type: 'text',
            name: '4 WIZYT',
            value: '320 zł'
          }]
        }]
      },
      {
        type: 'text',
        name: 'Joga',
        value: '',
        options: [{
          type: 'text',
          name: 'KARNETY ILOŚCIOWE',
          value: '',
          package: [{
            type: 'text',
            name: '12 lekcji - 2 msc.',
            value: '149 zł'
          },
          {
            type: 'text',
            name: '8 lekcji - 1 msc.',
            value: '115 zł'
          },
          {
            type: 'text',
            name: '4 lekcje - 1 msc.',
            value: '60 zł'
          }]
        },
        {
          type: 'text',
          name: 'KARNET OPEN',
          value: '',
          package: [{
            type: 'text',
            name: '6 miesięcy',
            value: '83 zł'
          },
          {
            type: 'text',
            name: '3 miesięcy',
            value: '118 zł'
          },
          {
            type: 'text',
            name: '12 miesięcy',
            value: '139 zł'
          }]
        }]
      },
      {
        type: 'text',
        name: '7mepoty',
        value: '',
        options: [
          {
            type: 'text',
            name: 'KARNETY OPEN',
            value: '',
            package: [
              {
                type: 'text',
                name: 'Siłowinia 6 msc',
                value: '59 zł'
              },
              {
                type: 'text',
                name: 'Siłowinia 3 msc',
                value: '84 zł'
              },
              {
                type: 'text',
                name: 'Siłowinia 1 msc',
                value: '99 zł'
              },
              {
                type: 'text',
                name: 'VACU 6 msc',
                value: '65 zł'
              },
              {
                type: 'text',
                name: 'VACU 3 msc',
                value: '92 zł'
              },
              {
                type: 'text',
                name: 'VACU 1 msc',
                value: '109 zł'
              },
              {
                type: 'text',
                name: 'SIŁOWNIA + VACU 6 msc',
                value: '83 zł'
              },
              {
                type: 'text',
                name: 'SIŁOWNIA + VACU 3 msc',
                value: '118 zł'
              },
              {
                type: 'text',
                name: 'SIŁOWNIA + VACU 1 msc',
                value: '139 zł'
              },
              {
                type: 'text',
                name: 'ZAJĘCIA GRUPOWE + VACU 6 msc',
                value: '83 zł'
              },
              {
                type: 'text',
                name: 'ZAJĘCIA GRUPOWE + VACU 3 msc',
                value: '118 zł'
              },
              {
                type: 'text',
                name: 'ZAJĘCIA GRUPOWE + VACU 1 msc',
                value: '139 zł'
              }
            ]
          },
          {
            type: 'text',
            name: 'KARNETY ILOŚCIOWE',
            value: '',
            package: [{
              type: 'text',
              name: '12 WEJŚĆ - 2 msc.',
              value: '149 zł'
            },
            {
              type: 'text',
              name: '8 WEJŚĆ - 1 msc.',
              value: '115 zł'
            },
            {
              type: 'text',
              name: '4 WEJŚĆ - 1 msc.',
              value: '60 zł'
            }
            ]
          },
          {
            type: 'text',
            name: 'TRENING PERSONALNY',
            value: '',
            package: [{
              type: 'text',
              name: '10 x TRENING PERSONALNY',
              value: '700 zł'
            }
            ]
          },
          {
            type: 'text',
            name: 'PAKIETY SOLARIUM',
            value: '',
            package: [{
              type: 'text',
              name: '200 minut solarium - 6 msc.',
              value: '200 zł'
            },
            {
              type: 'text',
              name: '120 minut solarium - 3 msc.',
              value: '132 zł'
            },
            {
              type: 'text',
              name: '60 minut solarium - 2 msc.',
              value: '72 zł'
            }
            ]
          }
        ]
      }
    ];
  ngOnInit() {
  }
}
