// import { FormBuilder } from "../About";

import PageFormBuilder from '../../dynamic/builder';

@PageFormBuilder({
  jsonName: 'config/home.json',
  provider: [],
})
export default class Home {
  [x: string]: any;

  constructor() {
    this.viewModel = { premium: 111 };
    // this.setJson({
    //   fields: [
    //     {
    //       id: 'input',
    //       type: 'input',
    //       label: '666',
    //       labelAction: 'getInputAction',
    //       dataBinding: {
    //         path: 'premium',
    //         converter: 'convertLblPaymentAmount',
    //       },
    //       layoutDefinition: {
    //         row: 1,
    //         column: 0,
    //         columnSpan: 6,
    //       },
    //     },
    //     {
    //       id: 'input',
    //       type: 'input',
    //       label: '666',
    //       dataBinding: {
    //         path: 'premium',
    //         converter: 'convertLblPaymentAmount',
    //       },
    //       validator: [
    //         {
    //           name: 'required',
    //         },
    //       ],
    //       layoutDefinition: {
    //         row: 1,
    //         column: 1,
    //         columnSpan: 6,
    //       },
    //     },
    //   ],
    // });

    // setTimeout(() => {

    //   this.setJson({
    //     fields: [
    //       {
    //         id: 'input',
    //         type: 'input',
    //         label: '666',
    //         dataBinding: {
    //           path: 'premium',
    //           converter: 'convertLblPaymentAmount',
    //         }
    //       }
    //     ]})
    // }, 1000);
  }

  getInputAction() {

    console.log(this.viewModel);
    return '我是一个大写的人';
  }

  getViewModel() {
    console.log(this.viewModel);
  }

  showModel() {
    console.log(this);

    this.target.updateField({
      id: 'html',
      label: "fdfdffff"
    });


  }
}
