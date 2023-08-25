// import { FormBuilder } from "../About";


import PageFormBuilder from "../../dynamic/builder/pageFormbuilder";



@PageFormBuilder({
  jsonName: 'config/home.json'
})
export default class Home{
  [x: string]: any;

  constructor() {
    // console.log('Home');
    this.viewModel = {premium: 111}

    console.warn('2323233333333333333')
  }

  getName() {
    console.log(222)
  }


}
  