// import { FormBuilder } from ".";
import React, { createContext } from 'react';
import PageFormBuilder from "../../dynamic/builder";


export const Context = createContext({});

@PageFormBuilder({
  jsonName: 'config/about.json'
})
export default class About{

  viewMode: any;

  constructor(props: any){

    this.viewMode = {
      premium: 123432
    }

    console.log(this)
    setTimeout(() => {
      this.viewMode.premium = '1111'
    }, 2000)

  }

  getName() {
    console.log(222)
  }
  readying(data: any) {
    console.log('data: ', data);

  }


  readyHandleViewModel() {
    console.log(222)
  }



}
  