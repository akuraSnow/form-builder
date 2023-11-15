// import { FormBuilder } from "../About";

import PageFormBuilder from '../../dynamic/builder';

@PageFormBuilder({
  id: 'home',
  jsonName: '',
  provider: [],
})
export default class Home {
  [x: string]: any;

  constructor(props: any) {
    // console.log('props: ', props);

    this.contents = props;
    this.viewModel = { premium: 111, modal: { name: '111' } };
    // this.viewModel.modal = {
    //   name: '2222',
    // };
    this.setJson({
      fields: [
        {
          id: 'input',
          type: 'input',
          labelAction: 'getLabel',
          dataBinding: {
            path: 'premium',
            converter: 'convertLblPaymentAmount',
          },
          validator: [
            {
              name: 'required',
            },
          ],
          layoutDefinition: {
            row: 1,
            column: 1,
            columnSpan: 6,
            grid: "0 0"
          },
        },
        {
          id: 'addValue',
          type: 'button',
          label: '添加',
          metaData: {
            type: 'primary',
          },
          layoutDefinition: {
            row: 0,
            column: 1,
            columnSpan: 2,
            grid: "0 1"
          },
          action: {
            onclick: {
              name: 'showModel',
              params: {
                type: 'label',
              },
            },
          },
        },
        {
          id: 'table',
          type: 'table',
          dataSourceAction: 'getCalculatorData',
          metaData: {
            columns: [
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
              },
              {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                render: [
                  {
                    element: '<div>编辑</div>',
                    onclick: {
                      name: 'openModels',
                    },
                  },
                ],
              },
            ],
          },
          layoutDefinition: {
            row: 1,
            column: 1,
            columnSpan: 12,
            grid: "1 1"
          },
        },

        {
          id: 'model111',
          type: 'modal',
          // dataSource: 'getCalculatorData',
          dataBinding: {
            path: 'modal',
          },
          metaData: {
            title: '编辑',
            open: false,
            destroyOnClose: true,
            jsonName: 'config/editCalculator.json',
            onOk: 'handleCancel',
            onCancel: 'handleCancel',
          },
          layoutDefinition: {
            row: 10,
            column: 1,
            columnSpan: 12,
            grid: "1 2"
          },
        },
      ],
    });
  }

  componentDidMount(data: any) {
    // console.log('data: ', data);
    // console.warn('data: ', this.contents);

    // this.loadJson({
    //   jsonName: 'config/editCalculator.json'
    // })
  }

  async getCalculatorData(res: any) {
    // console.log('res: ', res);

    return new Promise((res) => {

      setTimeout(() => {
        res([
          {
            name: '33',
            key: 0,
            content: '33',
          }
        ]);
      }, 2000);
    });
  }

  getInputAction() {
    console.log(this.viewModel);
    return Promise.resolve('我是一个rrr大写的人');
  }

  getViewModel() {
    console.log(this.viewModel);
  }

  showModel(params: any) {
    console.log(this.viewModel);

    this.updateField([
      {
        id: 'model111',
        list: [1,2,2,4],
        metaData: {
          title: '新增',
          open: true,
        },
      },
    ]);
  }

  handleCancel(params: any) {
    console.log('params: ', params);

    console.log(this.getFieldById('model111'));


    this.updateField([{ id: 'model111', metaData: { open: false } }]);
  }

  getLabel() {

    return 'fdf'
  }

  // getCalData() {
  //   return {
  //     name: '343444',
  //   };
  // }
}
