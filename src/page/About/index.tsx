// import { FormBuilder } from ".";
import React, { createContext } from 'react';
import PageFormBuilder from "../../dynamic/builder";


export const Context = createContext({});

@PageFormBuilder({
  jsonName: 'config/about.json'
})
export default class About{

  viewModel: any;

  constructor(props: any){

    this.viewModel = {
      application: {
        name: 'test',
        premium: 334,
        country: {
          code: 'lucy',
          name: 'Yiminghe'
        }
      },
      premium: 123432
    }

    setTimeout(() => {
      // this.viewModel.application = {
      //   name: '111111111111111'
      // };

      this.viewModel.application.name = '111111111111';
    }, 2000)

  }

  loadCountry() {

    return new Promise((res: any) => {
      res([
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ])
    })
  }

  checkHtml() {
    return 'required'
  }

  changeSelect() {
    console.log(this.viewModel);
  }

  changeShukuang() {


  }
  readying(data: any) {
    console.log('data: ', data);

  }


  readyHandleViewModel() {
    console.log(222)
  }



}
  