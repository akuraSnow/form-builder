// import { FormBuilder } from ".";
import React, { createContext } from 'react';
import PageFormBuilder from "../../dynamic/builder/pageFormbuilder";


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
  }


  


}
  