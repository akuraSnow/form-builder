// import { FormBuilder } from "../About";


import PageFormBuilder from "../../dynamic/builder";



@PageFormBuilder({
  jsonName: 'config/home.json'
})
export default class Home{
  [x: string]: any;

  constructor() {
    // console.log('Home');
    this.viewModel = {premium: 111}

    setTimeout(() =>{
      // this.viewModel = {premium: 2222}
      this.viewModel.premium = 'rer';
    }, 2000)
  }

  getName() {
    console.log(222)
  }

  getViewModel() {
    console.log(this.viewModel);
  }


}
  