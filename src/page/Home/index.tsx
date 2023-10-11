// import { FormBuilder } from "../About";


import PageFormBuilder from "../../dynamic/builder";



@PageFormBuilder({
  jsonName: 'config/home.json',
  json: [],
  provider: []
})
export default class Home{
  [x: string]: any;

  constructor() {

    this.viewModel = {premium: 111};
    this.setJson({
      "fields": [    {
        "id": "input",
        "type": "input",
        "label": "666",
        "labelAction": "getInputAction",
        "dataBinding": {
            "path": "premium",
            "converter": "convertLblPaymentAmount"
        },
        "layoutDefinition": {
            "row": 1,
            "column": 0,
            "columnSpan": 6
        }
    },
    {
        "id": "input",
        "type": "input",
        "label": "666",
        "dataBinding": {
            "path": "premium",
            "converter": "convertLblPaymentAmount"
        },
        "validator": [
            {
                "name": "required"
            }
        ],
        "layoutDefinition": {
            "row": 1,
            "column": 1,
            "columnSpan": 6
        }
    },


    {
        "id": "html",
        "type": "html",
        "label": "222222",
        "layoutDefinition": {
            "row": 5,
            "column": 0
        }
    },
    {
        "id": "html",
        "type": "html",
        "label": "<div>2-8<div>",
        "layoutDefinition": {
            "row": 2,
            "column": 8
        }
    }]
    });

  }


  getInputAction() {

    return '我是一个大写的人'
  }

  getViewModel() {
    console.log(this.viewModel);
  }

}
  