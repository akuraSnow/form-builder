// import { FormBuilder } from ".";
import React, { createContext } from 'react';
import PageFormBuilder from "../../dynamic/builder";


export const Context = createContext({});

@PageFormBuilder({
  id: 'About'
})
export default class About{
  [x: string]: any;
  viewModel: any;

  constructor(props: any, res: any){
    // console.log('props: ', props);
    // console.log('res: ', res);
    // console.log('res: ', this);


      this.loadJson({
        jsonName: 'config/preview.json'
      })
    



    // this.viewModel = {
    //   application: {
    //     name: 'test',
    //     premium: 334,
    //     country: {
    //       code: 'lucy',
    //       name: 'Yiminghe'
    //     }
    //   },
    //   premium: 123432
    // }

    setTimeout(() => {
      // this.viewModel.application = {
      //   name: '111111111111111'
      // };

      this.viewModel.name = '111111111111';
    }, 2000)

  }

  onPropsChange(props: any) {
    console.log('props: ', props);

  }

  async getData() {


    return new Promise((res: any) => {
      res({
          application: {
            premium: '32333333',
            country: {code: '2222'}
          }
        });
    }) 
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
    console.log(this._viewModel);
  }

  changeShukuang() {


  }
  readying(data: any) {
    // console.log('data: ', data);

  }


  readyHandleViewModel() {
    console.log(222)
  }



}
  