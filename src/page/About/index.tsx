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
        premium: 334
      },
      premium: 123432
    }

    console.log(this)
    setTimeout(() => {
      // this.viewModel.application = {
      //   name: '111111111111111'
      // };

      this.viewModel.application.name = '111111111111';
    }, 2000)

  }

  changeShukuang() {

    this.viewModel.application = {
      ...this.viewModel.application,
      name: '?????/'
    }
    console.log(this.viewModel);
  }
  readying(data: any) {
    console.log('data: ', data);

  }


  readyHandleViewModel() {
    console.log(222)
  }



}
  