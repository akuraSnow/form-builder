// import { FormBuilder } from "../About";


import PageFormBuilder from "../../dynamic/builder";



@PageFormBuilder({
  jsonName: 'config/home.json',
  provider: []
})
export default class Home{
  [x: string]: any;

  constructor() {

    this.viewModel = {premium: 111}

  }


  getInputAction() {

    return '我是一个大写的人'
  }

  getViewModel() {
    console.log(this.viewModel);
  }

  // convertLblPaymentAmount() {

  //   return {
  //     set: (value: any) => {return value},
  //     get: (value: any) => { return value}
  //   }
  // }
 

}
  